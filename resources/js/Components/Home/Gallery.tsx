import { faAdd, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Inertia } from '@inertiajs/inertia';
import { Button, Image, Tabs } from 'antd'
import React, { useMemo } from 'react'
import { achieveImages, careerkImages, openingImages } from '../../Config';
import useModalProps from '../../Hooks/useModalProps';
import { EventImages } from '../../Models/EventImages';
import AddEventImage from '../Modals/AddEventImage';
import GalleryEvent from './GalleryEvent';

export default function Gallery({ eventImages }: { eventImages: EventImages[] }) {
    const addEventImageModal = useModalProps();
    return (
        <section className="p-4 bg-main gallery">
            <AddEventImage {...addEventImageModal.modalProps} />
            <Tabs
                tabBarExtraContent={
                    <Button onClick={() => addEventImageModal.open()} type="primary">Add Event</Button>
                }
            >
                <Tabs.TabPane tab="All" key="item-1">
                    <Image.PreviewGroup >
                        <div className="grid grid-cols-1 md:grid-cols-4">
                            {
                                eventImages.map(
                                    event => (
                                        event.eventImages.map(
                                            image =>
                                                <Image
                                                    key={event.eventName + image.name}
                                                    className="inline"
                                                    src={image.path}
                                                />
                                        )
                                    )
                                )
                            }
                        </div>
                    </Image.PreviewGroup>
                </Tabs.TabPane>
                {
                    eventImages.map(
                        event =>
                            <Tabs.TabPane tab={event.eventName} key={event.id}>
                                <GalleryEvent key={event.id} event={event} />
                            </Tabs.TabPane>
                    )
                }
            </Tabs>
        </section>
    )
}
