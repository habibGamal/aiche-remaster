import { Card, Popconfirm } from 'antd'
import React from 'react'
import { Member } from '../../Models/Member'
import { FacebookOutlined, LinkedinOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Link } from '@inertiajs/inertia-react'
import Meta from 'antd/lib/card/Meta'
import { Inertia } from '@inertiajs/inertia'
import Auth from '../Common/Auth'

export default function MemberDisplay({ member }: { member: Member }) {
    return (
        <Card
            key={member.id}
            hoverable
            style={{ width: 260 }}
            cover={<img alt="example" className='h-[250px] object-cover' src={member.profile} />}
            actions={[
                <a className='text-lg' target="_blank" href={member.facebook}><FacebookOutlined /></a>,
                <a className='text-lg' target="_blank" href={member.linkedin}><LinkedinOutlined /></a>,
                <Auth>
                    <Link className='text-lg' href={Member.edit(member.id)}>
                        <EditOutlined key="edit" />
                    </Link>
                </Auth>
                ,
                <Auth>
                    <Popconfirm
                        title="Are you sure to delete this Member?"
                        onConfirm={() => { Inertia.delete(Member.delete(member.id)) }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteOutlined className='text-lg' key="delete" />
                    </Popconfirm>
                </Auth>
            ]}
            bodyStyle={{ padding: '12px 24px' }}
        >
            <Meta
                className="text-center justify-center py-1"
                title={<h4 className="text-2xl mb-0">{member.name}</h4>}
                description={<span className="uppercase">{member.position}</span>}
            />
        </Card>
    )
}
