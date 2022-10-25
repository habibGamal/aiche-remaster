import { Carousel } from 'antd'
import React from 'react'
import { SLIDER_IMAGES_PATH } from '../../Config'
import { Slider as SliderModel } from '../../Models/Slider'
import SliderItem from './SliderItem'

export default function Slider({ sliders }: { sliders: SliderModel[] }) {
    const homeSliderImages = [
        SLIDER_IMAGES_PATH + 'home_1.jpg',
        SLIDER_IMAGES_PATH + 'home_2.jpg',
        SLIDER_IMAGES_PATH + 'home_3.jpg',
    ]

    return (
        <Carousel autoplay>
            {
                sliders.length > 0 ?
                sliders.map(
                    (slider, i) => <SliderItem key={i} src={slider.path} link={slider.link}  />
                )
                :
                homeSliderImages.map(
                    (slider, i) => <SliderItem key={i} src={slider}  />
                )
            }
        </Carousel>
    )
}
