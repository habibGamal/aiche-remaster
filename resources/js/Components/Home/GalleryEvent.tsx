import { faAdd, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Inertia } from '@inertiajs/inertia'
import { Button, Image, Popconfirm, Tabs } from 'antd'
import React from 'react'
import useModalProps from '../../Hooks/useModalProps'
import { EventImages } from '../../Models/EventImages'
import AddEventImage from '../Modals/AddEventImage'

export default function GalleryEvent({ event }: { event: EventImages }) {
    const addEventImageModal = useModalProps();
    return (
        <>
            <AddEventImage {...addEventImageModal.modalProps} eventImages={event} />
            <Image.PreviewGroup>
                <div className="grid grid-cols-1 md:grid-cols-4">
                    <div className="flex items-center justify-center gap-4">
                        <Button onClick={() => addEventImageModal.open()} shape='circle' icon={<FontAwesomeIcon icon={faAdd} />} />

                        <Popconfirm
                            title="Are you sure to delete this entire event?"
                            onConfirm={() => { Inertia.delete(EventImages.delete(event.id)) }}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button danger shape='circle' icon={<FontAwesomeIcon icon={faTrash} />} />
                        </Popconfirm>
                    </div>
                    {
                        event.eventImages.map(
                            image =>
                                <div className="relative">
                                    <Image
                                        key={event.eventName + image.name}
                                        className="inline"
                                        src={image.path}
                                    />
                                    <Popconfirm
                                        title="Are you sure to delete this photo?"
                                        onConfirm={() => { Inertia.post(EventImages.deleteImageFromEvent(event.id), { image_name: image.name }, { preserveScroll: true }) }}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button className="!absolute bottom-1 left-1" danger type='primary' icon={<FontAwesomeIcon icon={faTrash} />} />
                                    </Popconfirm>
                                </div>
                        )
                    }
                </div>
            </Image.PreviewGroup>
        </>
    )
}
