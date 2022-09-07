import React from 'react'
import Fact from './Fact'

export default function Facts() {
    const facts = [
        {
            count: 1000,
            title: 'Chances of training',
            description: 'Are given for the best members do the best for AIChE SUSC',
        },
        {
            count: 150,
            title: 'Technical and none technical',
            description: 'Events and conferences',
        },
        {
            count: 50,
            title: 'Courses',
            description: 'Be avaliable for student by a qualified groub of professors of professors',
        },
        {
            count: 40,
            title: 'Field Trips',
            description: 'Are organized to various companies per year',
        },
        {
            count: 100,
            title: 'Valuable prizes',
            description: 'Are awarded to the best members',
        },
        {
            count: 3,
            title: 'Global prizes',
            description: 'like outstanding is awarded for AIChE SUSC as the BEST AIChE in the world',
        },
        {
            count: 170,
            title: 'Excellent students',
            description: 'join AIChE SUSC each season',
        },
        {
            count: 31500,
            title: 'Likes',
            description: 'On AIChE SUSC page on Facebook',
        },
    ]
    return (
        <section className="my-16">
            <div className="container">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
                    {
                        facts.map(
                            (fact, i) =><Fact fact={fact}/>
                        )
                    }
                </div>
            </div>
        </section>
    )
}
