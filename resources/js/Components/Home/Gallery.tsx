import { Image, Tabs } from 'antd'
import React, { useMemo } from 'react'
import { achieveImages, careerkImages, openingImages } from '../../AppConfig';

export default function Gallery() {

    const openning = useMemo(() =>
        Array.from(Array(17).keys()).map(
            index =>
                <Image
                    key={index}
                    className="inline"
                    src={openingImages('open2019', (index + 1).toString())}
                />
        ), []);
    const careerk = useMemo(() =>
        Array.from(Array(5).keys()).map(
            index =>
                <Image
                    key={index}
                    className="inline"
                    src={careerkImages('careerk', (index + 1).toString())}
                />
        ), []);
    const achieve = useMemo(() =>
        Array.from(Array(3).keys()).map(
            index =>
                <Image
                    key={index}
                    className="inline"
                    src={achieveImages((index + 1).toString())}
                />
        ), []);
    return (
        <section className="p-4 bg-main gallery">
            <Tabs>
                <Tabs.TabPane tab="All" key="item-1">
                    <Image.PreviewGroup>
                        <div className="grid grid-cols-1 md:grid-cols-4">
                            {
                                [...openning, ...careerk, ...achieve]
                            }
                        </div>
                    </Image.PreviewGroup>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Opening" key="item-2">
                    <Image.PreviewGroup>
                        <div className="grid grid-cols-1 md:grid-cols-4">
                            {
                                [...openning]
                            }
                        </div>
                    </Image.PreviewGroup>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Achieve" key="item-3">
                    <Image.PreviewGroup>
                        <div className="grid grid-cols-1 md:grid-cols-4">
                            {
                                [...achieve]
                            }
                        </div>
                    </Image.PreviewGroup>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Careerk" key="item-4">
                    <Image.PreviewGroup>
                        <div className="grid grid-cols-1 md:grid-cols-4">
                            {
                                [...careerk]
                            }
                        </div>
                    </Image.PreviewGroup>
                </Tabs.TabPane>
            </Tabs>
        </section>
    )
}
