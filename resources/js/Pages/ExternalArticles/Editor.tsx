import React, { useState } from "react";
import {
    Button,
    Form,
    Input,
    Select,
    Upload,
    UploadFile,
    UploadProps,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import {
    ExternalArticle,
    ExternalArticleDB,
} from "../../Models/ExternalArticle";

export default function Editor({
    externalArticleDB = undefined,
    categories,
}: {
    externalArticleDB?: ExternalArticleDB;
    categories: { id: number; name: string }[];
}) {
    // init article if edit mode
    const article = externalArticleDB && new ExternalArticle(externalArticleDB);
    // get errors from backend
    const { errors } = usePage().props;
    // cover filelist state

    const [fileList, setFileList] = useState<UploadFile[]>(
        article?.coverName
            ? [
                  {
                      uid: "-1",
                      name: article.coverName,
                      status: "done",
                      url: article.absCoverURI,
                  },
              ]
            : []
    );
    // cover image upload props
    const props: UploadProps = {
        beforeUpload: (file) => {
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
        Inertia.post(ExternalArticle.store(), {
            ...values,
            cover: fileList?.[0]?.originFileObj,
        });
    };
    const update = (values: any) => {
        const data = { ...values, _method: "put" };
        if (fileList[0]?.uid && fileList[0]?.uid !== "-1") {
            data.cover = fileList[0].originFileObj;
        }
        Inertia.post(ExternalArticle.update(article!.id), data);
    };

    return (
        <div className="container my-16">
            <div className="mx-auto">
                <Form
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                    initialValues={{ remember: true }}
                    onFinish={article ? update : store}
                    autoComplete="off"
                    method="post"
                    encType="multipart/form-data"
                    className="rounded-xl bg-white shadow-xl !p-8 border border-second"
                >
                    <h2 className="text-4xl text-center mb-8 sm:text-5xl font-bold text-second">
                        External Article
                    </h2>
                    <Form.Item
                        label="Title"
                        name="title"
                        validateStatus={errors?.title && "error"}
                        help={errors?.title}
                        initialValue={article?.title || ""}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Link"
                        name="link"
                        validateStatus={errors?.link && "error"}
                        help={errors?.link}
                        initialValue={article?.link || ""}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Cover"
                        name="cover"
                        valuePropName="fileList"
                        validateStatus={errors?.cover && "error"}
                        help={errors?.cover}
                    >
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
                        name="category"
                        label="Category"
                        validateStatus={errors?.category && "error"}
                        help={errors?.category}
                        initialValue={article?.categoryId}
                    >
                        <Select>
                            {categories.map((category) => (
                                <Select.Option
                                    key={category.id}
                                    value={category.id}
                                >
                                    {category.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Priority"
                        name="order"
                        rules={[{ required: false, message: errors?.title }]}
                        validateStatus={errors?.order && "error"}
                        help={errors?.order}
                        initialValue={article?.order}
                    >
                        <Select>
                            {
                                // generate options
                                Array.from(Array(20).keys()).map((i) => {
                                    return (
                                        <Select.Option key={i} value={i}>
                                            {i + 1}
                                        </Select.Option>
                                    );
                                })
                            }
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
}
