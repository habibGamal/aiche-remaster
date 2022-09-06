import { Link } from '@inertiajs/inertia-react';
import { Card } from 'antd';
import Meta from 'antd/lib/card/Meta';
import React from 'react';
import { IMAGES_PATH, SERVICES_IMAGES_PATH } from '../AppConfig';
import Slider from '../Components/Home/Slider';
import WhoWeAre from '../Components/Home/WhoWeAre';
const Home = () => {
    const servicesImages = [
        'blog.jpg',
        'cv.jpg',
        'library.jpg',
        'spark2022.jpg',
    ]
    const services = [
        {
            name:'Blogs',
            src:'blog.jpg',
            href:'#'
        },
        {
            name:'Design Your CV',
            src:'cv.jpg',
            href:'#'
        },
        {
            name:'Our Library',
            src:'library.jpg',
            href:'#'
        },
        {
            name:'Our Magazine',
            src:'spark2022.jpg',
            href:'#'
        },
    ]
    return (
        <>
            <Slider />
            <WhoWeAre />

            <section className="my-16">
                <div className="container">
                    <h2 className="section-title">Our  <span className="header-highlight">Services</span></h2>
                    <div className="flex items-start gap-8 justify-evenly">
                        {
                            services.map(service =>
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
                    </div>
                </div>
            </section>
            <div className="my-32">d</div>
        </>
    );
};
export default Home;
