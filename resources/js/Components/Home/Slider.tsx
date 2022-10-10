import { Carousel } from 'antd'
import React from 'react'
import { SLIDER_IMAGES_PATH } from '../../Config'
import SliderItem from './SliderItem'

export default function Slider({ sliderPhotos }: {
    sliderPhotos: {
        path: string;
        name: string;
    }[] | null
}) {
    const homeSliderImages = sliderPhotos?.map(photo => photo.path) || [
        SLIDER_IMAGES_PATH + 'home_1.jpg',
        SLIDER_IMAGES_PATH + 'home_2.jpg',
        SLIDER_IMAGES_PATH + 'home_3.jpg',
    ]
    console.log(sliderPhotos);

    return (
        <Carousel autoplay>
            {
                homeSliderImages.map(
                    (imageSrc, i) => <SliderItem key={i} src={imageSrc} />
                )
            }
        </Carousel>
    )
}
