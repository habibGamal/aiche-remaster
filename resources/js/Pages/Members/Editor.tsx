import React, { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from "jodit-react";
import { Button, Form, Input, Select, Upload, UploadFile, UploadProps } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import { Inertia } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import { RcFile } from 'antd/lib/upload';
import { Member, MemberDB, MemberIn } from '../../Models/Member';

export default function Editor({ memberDB = undefined }: { memberDB?: MemberDB }) {
    // init article if edit mode
    const member = memberDB && new Member(memberDB);
    // get errors from backend
    const { errors } = usePage().props
    // cover filelist state
    const [fileList, setFileList] = useState<UploadFile[]>(
        member ? [
            {
                uid: '-1',
                name: member.profileName,
                status: 'done',
                url: member.absProfileURI,
            },
        ] : []
    );

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
        maxCount: 1,
        fileList,
        listType: "picture-card",
        onChange: ({ fileList: newFileList }) => {
            setFileList(newFileList);
        },
        onPreview
    };
    // form submit
    const store = (values: any) => {
        Inertia.post(Member.store(), {
            ...values,
            profile: fileList?.[0]?.originFileObj
        })
    };
    const update = (values: any) => {
        const data = { ...values, _method: 'put' }
        if (fileList[0]?.uid && fileList[0]?.uid !== '-1') {
            data.profile = fileList[0].originFileObj
        }
        Inertia.post(Member.update(member!.id), data);
    };
    return (
        <div className="container my-16">
            <div className="mx-auto">
                <Form
                    name="basic"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={member ? update : store}
                    autoComplete="off"
                    method='post'
                    encType='multipart/form-data'
                >
                    <Form.Item
                        label="Member Name"
                        name="name"
                        validateStatus={errors?.name && 'error'}
                        help={errors?.name}
                        initialValue={member?.name || ''}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Member Position"
                        name="position"
                        validateStatus={errors?.position && 'error'}
                        help={errors?.position}
                        initialValue={member?.name || ''}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Member Facebook"
                        name="facebook"
                        validateStatus={errors?.facebook && 'error'}
                        help={errors?.facebook}
                        initialValue={member?.facebook || ''}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Member LinkedIn"
                        name="linkedin"
                        validateStatus={errors?.linkedin && 'error'}
                        help={errors?.linkedin}
                        initialValue={member?.linkedin || ''}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Profile"
                        name="profile"
                        valuePropName="fileList"
                        validateStatus={errors?.profile && 'error'}
                        help={errors?.profile}>
                        <>
                            <ImgCrop aspect={26 / 25} >
                                <Upload {...props} listType="picture-card" >
                                    <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                </Upload>
                            </ImgCrop>
                        </>
                    </Form.Item>
                    <Form.Item
                        label="Member in"
                        name="in"
                        initialValue={member?.in}
                        validateStatus={errors?.in && 'error'}
                        help={errors?.in}
                    >
                        <Select defaultValue={member?.in}>
                            <Select.Option value={MemberIn.TEAM}>Team</Select.Option>
                            <Select.Option value={MemberIn.HIGHBOARD}>Highboard</Select.Option>
                            <Select.Option value={MemberIn.BOARD}>Board</Select.Option>
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
};
