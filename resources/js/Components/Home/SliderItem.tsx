import React from 'react'

export default function SliderItem({ src, link }: { src: string, link?: string }) {

    return (
        link ?
        <a target="_blank" href={link}>
            <img className="select-none w-full lg:h-[75vh] min-h-[250px] object-cover" src={src} />
        </a>
        :  <img className="select-none w-full lg:h-[75vh] min-h-[250px] object-cover" src={src} />
    );
}
