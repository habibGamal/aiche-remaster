import React, { useState } from 'react';
import { Button, Form, Popconfirm, Upload, UploadFile, UploadProps } from 'antd';
import { PlusOutlined, CloudUploadOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import { Inertia } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import { RcFile } from 'antd/lib/upload';
import { AppConfig, AppConfigDB } from '../../Models/AppConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'antd/lib/form/Form';

export default function Editor({ sliderPhotosDB = undefined }: { sliderPhotosDB?: AppConfigDB }) {
    // init article if edit mode
    const appConfig = sliderPhotosDB && new AppConfig(sliderPhotosDB);
    const sliderPhotos = appConfig?.sliderPhotos();
    // get errors from backend
    const { errors } = usePage().props
    // cover filelist state
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
        listType: "picture-card",
        onChange: ({ fileList: newFileList }) => {
            setFileList(newFileList);
        },
        onPreview
    };
    // form submit
    const store = () => {
        Inertia.post(AppConfig.addSliderPhotos(), {
            slider_photos: fileList.map(file => file.originFileObj!),
        }, {
            onSuccess: () => setFileList([]),
        })
    };
    const deletePhoto = (path: string) => {
        Inertia.post(AppConfig.deleteSliderPhoto(), {
            photo_path: path,
        })
    }
    return (
        <div className="container my-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                {
                    sliderPhotos?.map(
                        photo =>
                            <div className="relative">
                                <img className='w-full' src={photo.path} />
                                <Popconfirm
                                    title="Are you sure to delete this photo?"
                                    onConfirm={() => deletePhoto(photo.name)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button className='!absolute bottom-1 left-1' type='primary' danger icon={<FontAwesomeIcon icon={faTrash} />} />
                                </Popconfirm>
                            </div>
                    )
                }
            </div>
            <div className="mx-auto">
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={store}
                    autoComplete="off"
                    method='post'
                    className="flex flex-col items-center gap-4 justify-center"
                    encType='multipart/form-data'
                >
                    <Form.Item
                        label="Add image to slider"
                        name="slider_photos"
                        valuePropName="fileList"
                        validateStatus={errors?.slider_photos && 'error'}
                        help={errors?.slider_photos}>
                        <>
                            <ImgCrop aspect={19 / 7} quality={1}>
                                <Upload {...props} listType="picture-card" >
                                    <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                </Upload>
                            </ImgCrop>
                        </>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
                        <Button icon={<CloudUploadOutlined />} type="primary" htmlType="submit">
                            Upload
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};
