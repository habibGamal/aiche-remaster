import { Carousel } from 'antd'
import React from 'react'
import { BACKGROUNDS_IMAGES_PATH } from '../../Config'
import Quote from './Quote'

export default function Quotes() {

    const quotations = [
        `If you make peace without defense power,
        then you should be really ready to be ruled.`,
        `We should be ready for a change.`,
        `There is no such thing as weak competition; it grows all the time.`
    ]
    return (
        <section className="my-16 background-qoutation" style={{backgroundImage:`url(${BACKGROUNDS_IMAGES_PATH + 'bg-quotes.jpg'})`}}>
            <div className="container">
                <Carousel autoplay>
                    {
                        quotations.map((quote,i) => <Quote key={i} quote={quote} />)
                    }
                </Carousel>
            </div>
        </section>
    )
}
