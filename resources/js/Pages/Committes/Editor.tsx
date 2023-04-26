import React from "react";
import { Button, Form, Input, message } from "antd";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import { Committe, CommitteDB } from "../../Models/Committe";
import { useForm } from "antd/lib/form/Form";

export default function Editor({
    committeDB = undefined,
}: {
    committeDB?: CommitteDB;
}) {
    const [form] = useForm();
    // init article if edit mode
    const committe = committeDB && new Committe(committeDB);
    // get errors from backend
    const { errors } = usePage().props;
    // form submit
    const store = (values: any) => {
        Inertia.post(
            Committe.store(),
            {
                ...values,
            },
            {
                onSuccess: () => {
                    message.success("Committee Added successfully");
                    form.resetFields();
                },
            }
        );
    };
    const update = (values: any) => {
        const data = { ...values, _method: "put" };
        Inertia.post(Committe.update(committe!.id), data, {
            onSuccess: () => message.success("Committee Updated successfully"),
        });
    };
    return (
        <div className="container my-16">
            <div className="mx-auto">
                <Form
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                    initialValues={{ remember: true }}
                    onFinish={committe ? update : store}
                    autoComplete="off"
                    method="post"
                    encType="multipart/form-data"
                    form={form}
                    className="rounded-xl bg-white shadow-xl !p-8 border border-second"
                >
                    <h2 className="text-4xl text-center mb-8 sm:text-5xl font-bold text-second">
                        Committee
                    </h2>
                    <Form.Item
                        label="Name"
                        name="name"
                        validateStatus={errors?.name && "error"}
                        help={errors?.name}
                        initialValue={committe?.name || ""}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Icon"
                        name="icon"
                        validateStatus={errors?.icon && "error"}
                        help={errors?.icon}
                        initialValue={committe?.icon || ""}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        validateStatus={errors?.description && "error"}
                        help={errors?.description}
                        initialValue={committe?.rawDescription || ""}
                    >
                        <Input.TextArea />
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
