import { Carousel } from 'antd'
import React from 'react'
import { SLIDER_IMAGES_PATH } from '../../AppConfig'
import SliderItem from './SliderItem'

export default function Slider() {
    const homeSliderImages = [
        'home_1.jpg',
        'home_2.jpg',
        'home_3.jpg',
    ]
    return (
        <Carousel autoplay>
            {
                homeSliderImages.map(
                    imageSrc => <SliderItem src={SLIDER_IMAGES_PATH + imageSrc} />
                )
            }
        </Carousel>
    )
}
