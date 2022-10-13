import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faPerson, faGlobe, faHandshake, faChevronRight, faLightbulb, faAddressBook, faMicrophone, faBook } from '@fortawesome/free-solid-svg-icons';
import { faAndroid, faFreeCodeCamp } from '@fortawesome/free-brands-svg-icons';
import Committee from './Committee';
import { Committe } from '../../Models/Committe';
import { Empty } from 'antd';
import { Link } from '@inertiajs/inertia-react';
export default function Committees({ committes }: { committes: Committe[] }) {
    return (
        <section className="my-16">
            <div className="container">
                <h2 className="section-title">Our  <span className="header-highlight">Committees</span></h2>
                {
                    committes.length === 0 && <Empty description={<>No committes added yet <br /> <Link href={Committe.create()}>Add Committee</Link></>} image={Empty.PRESENTED_IMAGE_SIMPLE} />
                }
                <div className="columns-1 md:columns-2 lg:columns-3 justify-evenly">
                    {
                        committes.map((committe, i) =>
                            <Committee key={i} committee={committe} />
                        )
                    }
                </div>
            </div>
        </section>
    )
}
