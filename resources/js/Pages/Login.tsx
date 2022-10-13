import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react'
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';

export default function Login() {
    const { errors } = usePage().props;
    const login = async (values: any) => {
        Inertia.post('/login', values);
    }
    return (
        <div className="container">
            <div className="rounded bg-ov-white shadow-sm p-4 max-w-[400px] mx-auto my-16">
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={login}
                >
                    <Form.Item
                        name="email"
                        validateStatus={errors?.email && 'error'}
                        help={errors?.email}
                        rules={[{ required: true, message: 'Please input your Email!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        validateStatus={errors?.password && 'error'}
                        help={errors?.password}
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item className='text-center !mb-0'>
                        <Button type="primary" htmlType="submit" className="login-form-button mx-auto">
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
