import { Link } from '@inertiajs/inertia-react'
import { Card } from 'antd'
import Meta from 'antd/lib/card/Meta'
import React from 'react'
import { SERVICES_IMAGES_PATH } from '../../AppConfig'

export default function Service({ service }: { service: { name: string, src: string, href: string } }) {
    return (
        <Card
            style={{ width: 300 }}
            cover={
                <img
                    alt="example"
                    className='h-[200px] object-cover'
                    src={SERVICES_IMAGES_PATH + service.src}
                />
            }
        >
            <Meta
                title={service.name}
                description={<Link href='#' className="capitalize">Go to link</Link>}
            />
        </Card>
    )
}
