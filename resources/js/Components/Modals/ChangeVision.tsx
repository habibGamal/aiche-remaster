import React from 'react'
import { Inertia } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import { Button, Form, Input, Modal as AntModal, UploadFile, UploadProps } from 'antd'
import { PlusOutlined, CloudUploadOutlined } from '@ant-design/icons';
import Upload, { RcFile } from 'antd/lib/upload'
import { useState } from 'react'
import { AppConfig } from '../../Models/AppConfig'
import ImgCrop from 'antd-img-crop'

export default function ChangeVision({ isModalOpen, close, vision }: {
    isModalOpen: boolean, close: () => void, vision: {
        vision: string;
        vision_description: string;
    } | null
}) {
    // get errors from backend
    const { errors } = usePage().props
    // form submit
    const update = (values: any) => {
        Inertia.post(AppConfig.updateVision(), values, {
            preserveScroll: true,
        })
    };
    return (
        <>
            <AntModal title="Change Vision" visible={isModalOpen} onCancel={close} footer={null}>
                <Form
                    name="vision"
                    initialValues={{ remember: true }}
                    onFinish={update}
                    autoComplete="off"
                    method='post'
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 12 }}
                >
                    <Form.Item
                        label="Vision"
                        name="vision"
                        validateStatus={errors?.vision && 'error'}
                        help={errors?.vision}
                        initialValue={vision?.vision || ''}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Vision Description"
                        name="vision_description"
                        validateStatus={errors?.vision_description && 'error'}
                        help={errors?.vision_description}
                        initialValue={vision?.vision_description || ''}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }} >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </AntModal>
        </>
    );
};
