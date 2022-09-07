import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import React from 'react'

export default function Quote({ quote }: { quote: string }) {
    return (
        <div className="py-32 text-3xl text-center">
            <p className="text-white font-bold leading-10 text-shadow max-w-[650px] mx-auto">
                <FontAwesomeIcon icon={faQuoteLeft} className="text-second" />
                <span className='mx-2'>
                    {quote}
                </span>
                <FontAwesomeIcon icon={faQuoteLeft} className="text-second rotate-180" />
            </p>
        </div>
    )
}
