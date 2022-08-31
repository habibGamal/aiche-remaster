import React, { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from "jodit-react";
import { Button, Form, Input, Upload, UploadFile, UploadProps } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';
import { Inertia } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import { Article, ArticleDB } from '../../Models/Article';

export default function Editor({ articleDB = undefined }: { articleDB?: ArticleDB }) {
    // init article if edit mode
    const article = articleDB && new Article(articleDB);
    // get errors from backend
    const { errors } = usePage().props
    // editor ref
    const editor = useRef(null)
    // editor content , init its content if in edit mode
    const [content, setContent] = useState(article?.content || '');
    // editor config
    const config = {
        readonly: false,
        placeholder: 'Start typings...',
        uploader: {
            insertImageAsBase64URI: true
        },
    }
    // cover filelist state
    const [fileList, setFileList] = useState<UploadFile[]>(
        article ? [
            {
                uid: '-1',
                name: article.coverName,
                status: 'done',
                url: article.absCoverURI,
            },
        ] : []
    );
    // cover image upload props
    const props: UploadProps = {
        beforeUpload: file => {
            return false;
        },
        maxCount: 1,
        fileList,
        onChange: ({ fileList: newFileList }) => {
            setFileList(newFileList);
        },
    };
    // form submit
    const store = (values: any) => {
        Inertia.post('/articles', {
            ...values,
            content,
            cover: fileList?.[0]?.originFileObj
        })
    };
    const update = (values: any) => {
        const data = { ...values, content, _method: 'put' }
        if (fileList[0]?.uid && fileList[0]?.uid !== '-1') {
            data.cover = fileList[0].originFileObj
        }
        Inertia.post(`/articles/${article!.id}`, data);
    };

    return (
        <div className="container my-16">
            <div className="mx-auto">
                <Form
                    name="basic"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={article ? update : store}
                    autoComplete="off"
                    method='post'
                    encType='multipart/form-data'
                >
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[{ required: false, message: errors?.title }]}
                        validateStatus={errors?.title && 'error'}
                        help={errors?.title}
                        initialValue={article?.title || ''}
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
                            <Upload {...props} listType="picture-card">
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            </Upload>
                        </>
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ message: '' }]}
                        validateStatus={errors?.description && 'error'}
                        help={errors?.description}
                        initialValue={article?.description || ''}
                    >
                        <Input.TextArea allowClear showCount />
                    </Form.Item>
                    <Form.Item
                        name="content"
                        label="Content"
                        rules={[{ message: '' }]}
                        validateStatus={errors?.content && 'error'}
                        help={errors?.content}
                    >
                        <>
                            <JoditEditor
                                ref={editor}
                                value={content}
                                config={config}
                                onChange={newContent => { }}
                                onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                            />
                        </>
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
