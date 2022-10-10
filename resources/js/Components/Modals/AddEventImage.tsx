import React from 'react'
import { Inertia } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import { Button, Form, Input, message, Modal as AntModal, UploadFile, UploadProps } from 'antd'
import { PlusOutlined, CloudUploadOutlined } from '@ant-design/icons';
import Upload, { RcFile } from 'antd/lib/upload'
import { useState } from 'react'
import ImgCrop from 'antd-img-crop'
import { EventImages } from '../../Models/EventImages';
import { useForm } from 'antd/lib/form/Form';

export default function AddEventImage({ isModalOpen, close, eventImages = null }: { isModalOpen: boolean, close: () => void, eventImages?: EventImages | null }) {
    const [form] = useForm()
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
        // maxCount: 1,
        multiple:true,
        listType: "picture-card",
        onChange: ({ fileList: newFileList }) => {
            setFileList(newFileList);
        },
        onPreview
    };
    // form submit
    const store = (values:any) => {
        Inertia.post(EventImages.store(), {
            ...values,
            event_images: fileList.map(file => file.originFileObj!),
        }, {
            onSuccess: () => {
                setFileList([]);
                close();
                form.resetFields();
            },
            onProgress: ()=>{
                message.loading('Uploading...');
            },
            preserveScroll: true,
        })
    };
    const update = () => {
        Inertia.post(EventImages.update(eventImages!.id), {
            event_images: fileList.map(file => file.originFileObj!),
            _method: 'put'
        }, {
            onSuccess: () => {
                setFileList([]);
                close();
            },
            onProgress: ()=>{
                message.loading('Uploading...');
            },
            preserveScroll: true,
        })
    };
    return (
        <>
            <AntModal title="Change President Photo" visible={isModalOpen} onCancel={close} footer={null}>
                <Form
                    name="event_image"
                    initialValues={{ remember: true }}
                    onFinish={eventImages ? update : store}
                    autoComplete="off"
                    method='post'
                    className="flex flex-col items-center gap-4 justify-center"
                    encType='multipart/form-data'
                    form={form}
                >
                    <Form.Item
                        label="Event Name"
                        name="event_name"
                        validateStatus={errors?.event_name && 'error'}
                        help={errors?.event_name}
                        initialValue={eventImages?.eventName || ''}
                    >
                        <Input disabled={eventImages !== null} />
                    </Form.Item>
                    <Form.Item
                        label="Event Images"
                        name="event_images"
                        valuePropName="fileList"
                        validateStatus={errors?.event_images && 'error'}
                        help={errors?.event_images}>
                        <>
                            {/* <ImgCrop aspect={3 / 2} > */}
                                <Upload {...props} listType="picture-card" >
                                    <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                </Upload>
                            {/* </ImgCrop> */}
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
