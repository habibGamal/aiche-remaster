import React from 'react'
import CountUp from 'react-countup'
import VisibilitySensor from 'react-visibility-sensor';

export default function Counter({count}:{count:number}) {
    return (
        <CountUp end={count} redraw={true}>
            {({ countUpRef, start }) => (
                <VisibilitySensor onChange={start} delayedCall>
                    <span ref={countUpRef} />
                </VisibilitySensor>
            )}
        </CountUp>
    )
}
