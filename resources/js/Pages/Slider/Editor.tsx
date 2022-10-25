import React, { useState } from 'react';
import { Button, Form, Input, Popconfirm, Upload, UploadFile, UploadProps } from 'antd';
import { PlusOutlined, CloudUploadOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import { Inertia } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import { RcFile } from 'antd/lib/upload';
import { AppConfig, AppConfigDB } from '../../Models/AppConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faLink, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Slider, SliderDB } from '../../Models/Slider';
import { useForm } from 'antd/lib/form/Form';
import useModalProps from '../../Hooks/useModalProps';
import ChangeSliderLink from '../../Components/Modals/ChangeSliderLink';

export default function Editor({ slidersDB }: { slidersDB?: SliderDB[] }) {
    const [form] = useForm();
    const sliders = slidersDB?.map(slider => new Slider(slider));
    const [currentSlider, setCurrentSlider] = useState<Slider | null>(null);
    const changeSliderLink = useModalProps();
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
        multiple: false,
        maxCount: 1,
        listType: "picture-card",
        onChange: ({ fileList: newFileList }) => {
            setFileList(newFileList);
        },
        onPreview
    };
    // form submit
    const store = (values: any) => {
        Inertia.post(Slider.store(), {
            ...values,
            slider_photo: fileList?.[0]?.originFileObj,
        }, {
            onSuccess: () => {
                form.resetFields();
                setFileList([])
            },
        })
    };
    return (
        <div className="container my-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                {
                    currentSlider &&
                    <ChangeSliderLink {...changeSliderLink.modalProps} slider={currentSlider} />
                }
                {
                    sliders?.map(
                        slider =>
                            <div className="relative">
                                {
                                    slider.link ?
                                        <a target="_blank" href={slider.link}>
                                            <img className='w-full' src={slider.path} />
                                        </a>
                                        : <img className='w-full' src={slider.path} />

                                }
                                <Popconfirm
                                    title="Are you sure to delete this slide?"
                                    onConfirm={() => Inertia.delete(Slider.delete(slider.id))}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button className='!absolute bottom-1 left-1' type='primary' danger icon={<FontAwesomeIcon icon={faTrash} />} />
                                </Popconfirm>
                                <Button
                                    onClick={() => {
                                        setCurrentSlider(slider);
                                        changeSliderLink.open();
                                    }}
                                    className='!absolute bottom-1 left-10'
                                    type='primary'
                                    icon={<FontAwesomeIcon icon={faLink} />}
                                />
                            </div>
                    )
                }
            </div>
            <div className="mx-auto">
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={store}
                    form={form}
                    autoComplete="off"
                    method='post'
                    className="max-w-[500px]"
                    encType='multipart/form-data'
                >
                    <Form.Item
                        label="Link for the slide"
                        name="link"
                        validateStatus={errors?.link && 'error'}
                        help={errors?.link}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Image of the slide"
                        name="slider_photo"
                        valuePropName="fileList"
                        validateStatus={errors?.slider_photo && 'error'}
                        help={errors?.slider_photo}>
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
