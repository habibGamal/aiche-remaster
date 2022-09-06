import React from 'react'

export default function SliderItem({ src }: { src: string }) {

    return <img className="select-none w-full lg:h-[75vh] min-h-[250px] object-cover" src={src} />

}
