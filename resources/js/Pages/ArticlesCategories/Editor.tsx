import React, { useState } from 'react';
import { Button, Form, Input, Select, Upload, UploadFile, UploadProps } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import { Inertia } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import { ArticleCategory, ArticleCategoryDB, ArticleCategoryType } from '../../Models/ArticleCategory';
import { RcFile } from 'antd/lib/upload';

export default function Editor({ articleCategoryDB = undefined }: { articleCategoryDB?: ArticleCategoryDB }) {
    // init article if edit mode
    const articleCategory = articleCategoryDB && new ArticleCategory(articleCategoryDB);
    // get errors from backend
    const { errors } = usePage().props
    // cover filelist state
    const [fileList, setFileList] = useState<UploadFile[]>(
        articleCategory ? [
            {
                uid: '-1',
                name: articleCategory.coverName,
                status: 'done',
                url: articleCategory.absCoverURI,
            },
        ] : []
    );

    const onPreview = async (file: UploadFile) => {
        let src = file.url as string;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj as RcFile);
                reader.onload = () => resolve(reader.result as string);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };
    // cover image upload props
    const props: UploadProps = {
        customRequest: ({ file, onSuccess }) => {
            setTimeout(() => {
                onSuccess!("ok");
            }, 0);
        },
        maxCount: 1,
        fileList,
        listType: "picture-card",
        onChange: ({ fileList: newFileList }) => {
            setFileList(newFileList);
        },
        onPreview
    };
    // form submit
    const store = (values: any) => {
        Inertia.post(ArticleCategory.store(), {
            ...values,
            cover: fileList?.[0]?.originFileObj
        })
    };
    const update = (values: any) => {
        const data = { ...values, _method: 'put' }
        if (fileList[0]?.uid && fileList[0]?.uid !== '-1') {
            data.cover = fileList[0].originFileObj
        }
        Inertia.post(ArticleCategory.update(articleCategory!.id), data);
    };
    return (
        <div className="container my-16">
            <div className="mx-auto">
                <Form
                    name="basic"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={articleCategory ? update : store}
                    autoComplete="off"
                    method='post'
                    encType='multipart/form-data'
                >
                    <Form.Item
                        label="Category Name"
                        name="name"
                        rules={[{ required: false, message: errors?.title }]}
                        validateStatus={errors?.name && 'error'}
                        help={errors?.name}
                        initialValue={articleCategory?.name || ''}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Cover"
                        name="cover"
                        valuePropName="fileList"
                        validateStatus={errors?.cover && 'error'}
                        help={errors?.cover}>
                        <>
                            <ImgCrop aspect={3 / 2} >
                                <Upload {...props} listType="picture-card" >
                                    <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                </Upload>
                            </ImgCrop>
                        </>
                    </Form.Item>
                    <Form.Item
                        label="Category Type"
                        name="type"
                        rules={[{ required: false, message: errors?.title }]}
                        validateStatus={errors?.type && 'error'}
                        help={errors?.type}
                        initialValue={articleCategory?.type}
                    >
                        <Select>
                            <Select.Option value={ArticleCategoryType.ExternalArticles}>External Articles</Select.Option>
                            <Select.Option value={ArticleCategoryType.Articles}>Articles</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};
