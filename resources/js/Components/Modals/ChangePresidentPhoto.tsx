import React from 'react'
import { Inertia } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import { Button, Form, Modal as AntModal, UploadFile, UploadProps } from 'antd'
import { PlusOutlined, CloudUploadOutlined } from '@ant-design/icons';
import Upload, { RcFile } from 'antd/lib/upload'
import { useState } from 'react'
import { AppConfig } from '../../Models/AppConfig'
import ImgCrop from 'antd-img-crop'

export default function ChangePresidentPhoto({ isModalOpen, close }: { isModalOpen: boolean, close: () => void }) {
    // get errors from backend
    const { errors } = usePage().props
    const [fileList, setFileList] = useState<UploadFile[]>([]);

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
        fileList,
        maxCount: 1,
        listType: "picture-card",
        onChange: ({ fileList: newFileList }) => {
            setFileList(newFileList);
        },
        onPreview
    };
    // form submit
    const update = () => {
        Inertia.post(AppConfig.updatePresidentPhoto(), {
            president_photo: fileList?.[0].originFileObj!,
        }, {
            onSuccess: () => {
                setFileList([]);
                close();
            },
            preserveScroll:true,
        })
    };
    return (
        <>
            <AntModal title="Change President Photo" visible={isModalOpen} onCancel={close} footer={null}>
                <Form
                    name="president_photo"
                    initialValues={{ remember: true }}
                    onFinish={update}
                    autoComplete="off"
                    method='post'
                    className="flex flex-col items-center gap-4 justify-center"
                    encType='multipart/form-data'
                >
                    <Form.Item
                        label="President Photo"
                        name="president_photo"
                        valuePropName="fileList"
                        validateStatus={errors?.president_photo && 'error'}
                        help={errors?.president_photo}>
                        <>
                            <ImgCrop aspect={1 / 1} >
                                <Upload {...props} listType="picture-card" >
                                    <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                </Upload>
                            </ImgCrop>
                        </>
                    </Form.Item>
                    <Form.Item >
                        <Button icon={<CloudUploadOutlined />} type="primary" htmlType="submit">
                            Upload
                        </Button>
                    </Form.Item>
                </Form>
            </AntModal>
        </>
    );
};
