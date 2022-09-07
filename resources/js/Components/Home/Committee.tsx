import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChevronRight} from '@fortawesome/free-solid-svg-icons'
import React from 'react'

export default function Committee({ committee }: {
    committee: {
        icon: IconDefinition;
        name: string;
        description: string[];
    }
}) {
    return (
        <div className="rounded-lg shadow-lg p-4 text-center max-w-[350px] break-inside-avoid-column mb-8 mx-auto">
            <FontAwesomeIcon icon={committee.icon} size="4x" className="text-second" />
            <h2 className="text-2xl my-4 border-main">{committee.name}</h2>
            {
                committee.description.map((sentence,i) =>
                    <p key={i} className="relative text-left ml-6">
                        <FontAwesomeIcon icon={faChevronRight} className="text-main absolute top-2 -left-6" />
                        {sentence}
                    </p>
                )
            }
        </div>
    )
}
