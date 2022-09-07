import React from 'react'
import Counter from '../Common/Counter';

export default function Fact({ fact }: {
    fact: {
        count: number;
        title: string;
        description: string;
    }
}) {
    return (
        <div className="text-center flex flex-col max-w-[300px]">
            <span className="text-5xl font-extrabold text-second poppins"><Counter count={fact.count} /></span>
            <span className="font-bold poppins">{fact.title}</span>
            <p>{fact.description}</p>
        </div>
    )
}
