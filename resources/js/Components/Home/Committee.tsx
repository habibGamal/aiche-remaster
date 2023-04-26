import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { Button, Collapse, Dropdown, Menu, Modal, Popconfirm } from "antd";
import { Link } from "@inertiajs/inertia-react";
import { Committe } from "../../Models/Committe";
import { Inertia } from "@inertiajs/inertia";
import Auth from "../Common/Auth";
import CollapsePanel from "antd/lib/collapse/CollapsePanel";

export default function Committee({ committee }: { committee: Committe }) {
    const menu = (
        <Menu
            items={[
                {
                    label: <Link href={Committe.edit(committee.id)}>Edit</Link>,
                    key: "edit",
                    icon: <EditOutlined />,
                },
                {
                    label: (
                        <Popconfirm
                            title="Are you sure to delete this Member?"
                            onConfirm={() => {
                                Inertia.delete(Committe.delete(committee.id));
                            }}
                            okText="Yes"
                            cancelText="No"
                        >
                            Delete
                        </Popconfirm>
                    ),
                    key: "delete",
                    icon: <DeleteOutlined />,
                },
            ]}
        />
    );

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div className="rounded-lg relative shadow-lg h-[200px] p-4 text-center max-w-[350px] break-inside-avoid-column mb-8 mx-auto">
            <FontAwesomeIcon
                icon={committee.icon}
                size="4x"
                className="text-second"
            />
            <h2 className="text-2xl my-4 border-main">{committee.name}</h2>
            {/* {committee.description.map((sentence, i) => (
                <p key={i} className="relative text-left ml-6 text-ellipsis">
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        className="text-main absolute top-2 -left-6"
                    />
                    {sentence}
                </p>
            ))} */}
            <Modal
                // title="Basic Modal"
                visible={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                className="rounded-lg relative shadow-lg overflow-hidden !p-0 text-center max-w-[350px] break-inside-avoid-column mb-8 mx-auto"
            >
                {/* <div className="rounded-lg relative shadow-lg p-4 text-center max-w-[350px] break-inside-avoid-column mb-8 mx-auto"> */}
                    <FontAwesomeIcon
                        icon={committee.icon}
                        size="4x"
                        className="text-second"
                    />
                    <h2 className="text-2xl my-4 border-main">
                        {committee.name}
                    </h2>
                    {committee.description.map((sentence, i) => (
                        <p
                            key={i}
                            className="relative text-left ml-6 text-ellipsis"
                        >
                            <FontAwesomeIcon
                                icon={faChevronRight}
                                className="text-main absolute top-2 -left-6"
                            />
                            {sentence}
                        </p>
                    ))}
                {/* </div> */}
            </Modal>
            <Button onClick={showModal}>Read</Button>
            <Auth>
                <Dropdown.Button
                    className="!absolute top-4 right-4"
                    onClick={() => {}}
                    overlay={menu}
                />
            </Auth>
        </div>
    );
}
