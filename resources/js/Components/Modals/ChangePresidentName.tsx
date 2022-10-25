import React from 'react'
import { Inertia } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import { Button, Form, Input, Modal as AntModal } from 'antd'
import { AppConfig } from '../../Models/AppConfig'

export default function ChangePresidentName({ isModalOpen, close, presidentName }: {
    isModalOpen: boolean, close: () => void, presidentName: string | null
}) {
    // get errors from backend
    const { errors } = usePage().props
    // form submit
    const update = (values: any) => {
        Inertia.post(AppConfig.updatePresidentName(), values, {
            preserveScroll: true,
        })
    };
    return (
        <>
            <AntModal title="Change Vision" visible={isModalOpen} onCancel={close} footer={null}>
                <Form
                    name="president_name"
                    initialValues={{ remember: true }}
                    onFinish={update}
                    autoComplete="off"
                    method='post'
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 12 }}
                >
                    <Form.Item
                        label="President Name"
                        name="president_name"
                        validateStatus={errors?.president_name && 'error'}
                        help={errors?.president_name}
                        initialValue={presidentName || ''}
                    >
                        <Input />
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
