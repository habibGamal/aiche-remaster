import { faAdd, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Inertia } from "@inertiajs/inertia";
import { Button, Image, Popconfirm, Tabs } from "antd";
import React from "react";
import useModalProps from "../../Hooks/useModalProps";
import { EventImages } from "../../Models/EventImages";
import Auth from "../Common/Auth";
import AddEventImage from "../Modals/AddEventImage";

const AMOUNT_OF_IMAGES_TO_LOAD = 8;

export default function GalleryEvent({ event }: { event: EventImages }) {
    const addEventImageModal = useModalProps();
    const [numberOfImages, setNumberOfImages] = React.useState(AMOUNT_OF_IMAGES_TO_LOAD);
    return (
        <>
            <Auth>
                <AddEventImage
                    {...addEventImageModal.modalProps}
                    eventImages={event}
                />
            </Auth>
            <Image.PreviewGroup>
                <div className="grid grid-cols-1 md:grid-cols-4">
                    <Auth>
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <Button
                                onClick={() => addEventImageModal.open()}
                                shape="circle"
                                icon={<FontAwesomeIcon icon={faAdd} />}
                            />

                            <Popconfirm
                                title="Are you sure to delete this entire event?"
                                onConfirm={() => {
                                    Inertia.delete(
                                        EventImages.delete(event.id)
                                    );
                                }}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button
                                    danger
                                    shape="circle"
                                    icon={<FontAwesomeIcon icon={faTrash} />}
                                />
                            </Popconfirm>
                        </div>
                    </Auth>
                    {event.eventImages.map((image, i) =>
                        i < numberOfImages ? (
                            <div className="relative">
                                <Image
                                    key={event.eventName + image.name}
                                    className="inline"
                                    src={image.path}
                                />
                                <Auth>
                                    <Popconfirm
                                        title="Are you sure to delete this photo?"
                                        onConfirm={() => {
                                            Inertia.post(
                                                EventImages.deleteImageFromEvent(
                                                    event.id
                                                ),
                                                { image_name: image.name },
                                                { preserveScroll: true }
                                            );
                                        }}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button
                                            className="!absolute bottom-1 left-1"
                                            danger
                                            type="primary"
                                            icon={
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                />
                                            }
                                        />
                                    </Popconfirm>
                                </Auth>
                            </div>
                        ) : null
                    )}
                    <div className="grid place-items-center">
                        <Button
                            onClick={() =>
                                setNumberOfImages(numberOfImages + AMOUNT_OF_IMAGES_TO_LOAD)
                            }
                        >
                            Load More
                        </Button>
                    </div>
                </div>
            </Image.PreviewGroup>
        </>
    );
}
