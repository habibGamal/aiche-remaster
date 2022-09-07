import React from 'react'
import Service from './Service'

export default function Services() {

    const services = [
        {
            name: 'Blogs',
            src: 'blog.jpg',
            href: '#'
        },
        {
            name: 'Design Your CV',
            src: 'cv.jpg',
            href: '#'
        },
        {
            name: 'Our Library',
            src: 'library.jpg',
            href: '#'
        },
        {
            name: 'Our Magazine',
            src: 'spark2022.jpg',
            href: '#'
        },
    ]
    return (
        <section className="my-16">
            <div className="container">
                <h2 className="section-title">Our  <span className="header-highlight">Services</span></h2>
                <div className="flex items-start gap-8 justify-evenly flex-wrap">
                    {
                        services.map((service,i) => <Service key={i} service={service} />)
                    }
                </div>
            </div>
        </section>
    )
}
