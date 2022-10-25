import React, { useMemo } from 'react'
import { Inertia } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import { Button, Form, Input, message, Modal as AntModal } from 'antd'
import { AppConfig } from '../../Models/AppConfig'
import { Slider } from '../../Models/Slider'
import { useForm } from 'antd/lib/form/Form'

export default function ChangeSliderLink({ isModalOpen, close, slider }: {
    isModalOpen: boolean, close: () => void, slider: Slider
}) {
    const [form] = useForm();

    // get errors from backend
    const { errors } = usePage().props
    // form submit
    const update = (values: any) => {
        Inertia.post(Slider.update(slider.id), { ...values, '_method': 'put' }, {
            preserveScroll: true,
            onSuccess: () => {
                message.success('Link successfuly updated');
                close();
            }
        })
    };
    return (
        <>
            <AntModal title="Change Slider Link" visible={isModalOpen} onCancel={close} footer={null}>
                <Form
                    name="slider_link"
                    onFinish={update}
                    autoComplete="off"
                    method='post'
                    form={form}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 12 }}
                >
                    <span className="bg-gray-200 rounded p-1 block mb-4">Current Link : <a target="_blank" href={slider.link}>{slider.link}</a> </span>
                    <Form.Item
                        label="New Link"
                        name="link"
                        validateStatus={errors?.link && 'error'}
                        help={errors?.link}
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
