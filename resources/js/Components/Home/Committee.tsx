import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import React from 'react'
import { Dropdown, Menu, Popconfirm } from 'antd';
import { Link } from '@inertiajs/inertia-react';
import { Committe } from '../../Models/Committe';
import { Inertia } from '@inertiajs/inertia';

export default function Committee({ committee }: { committee: Committe }) {
    const menu = (
        <Menu
            items={[
                {
                    label: <Link href={Committe.edit(committee.id)}>Edit</Link>,
                    key: 'edit',
                    icon: <EditOutlined />,
                },
                {
                    label: <Popconfirm
                        title="Are you sure to delete this Member?"
                        onConfirm={() => { Inertia.delete(Committe.delete(committee.id)) }}
                        okText="Yes"
                        cancelText="No"
                    >
                        Delete
                    </Popconfirm>
                    ,
                    key: 'delete',
                    icon: <DeleteOutlined />,
                },
            ]}
        />
    );
    return (
        <div className="rounded-lg relative shadow-lg p-4 text-center max-w-[350px] break-inside-avoid-column mb-8 mx-auto">
            <FontAwesomeIcon icon={committee.icon} size="4x" className="text-second" />
            <h2 className="text-2xl my-4 border-main">{committee.name}</h2>
            {
                committee.description.map((sentence, i) =>
                    <p key={i} className="relative text-left ml-6">
                        <FontAwesomeIcon icon={faChevronRight} className="text-main absolute top-2 -left-6" />
                        {sentence}
                    </p>
                )
            }
            <Dropdown.Button className="!absolute top-4 right-4" onClick={() => { }} overlay={menu} />
        </div>
    )
}
