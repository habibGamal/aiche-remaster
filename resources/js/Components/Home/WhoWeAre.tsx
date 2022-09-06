import React from 'react'
import { IMAGES_PATH } from '../../AppConfig'

export default function WhoWeAre() {
    return (
        <section className="my-16">
            <div className="container">
                <h2 className="section-title">Who We <span className="header-highlight">Are</span></h2>
                <div className="grid sm:grid-cols-3 gap-8">
                    <div className="sm:col-span-2 text-xl">
                        <p>
                            AIChE stands for " American Institute of Chemical Engineers". It is the world's leading organization for chemical engineering professionals. It's a nonprofit organization with more than 60,000 members from over 110 countries worldwide.
                        </p>
                        <p>
                            AIChE, Suez University Student Chapter (AIChE SUSC) was founded in 2013 as a branch from AIChE International, and it includes a group of undergraduate students, dedicated to the advancement of academic learning techniques, and personal development systems, trying to create links between the university and the industry.
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <div className="relative president-shadow">
                            <img className="w-[200px] h-[200px] rounded-full object-cover " src={IMAGES_PATH + 'president.jpg'} alt="" />
                            <h2 className="text-center text-2xl mb-0">
                                Ahmed El-Atar
                            </h2>
                            <h3 className="text-center text-lg text-[#7a7a7a]">
                                Mr.President
                            </h3>
                        </div>
                    </div>
                </div>
                <button className="px-8 py-3 block mx-auto font-bold text-xl rounded-full bg-second text-white hover:bg-main transition-colors duration-300">Read More</button>
            </div>
        </section>
    )
}
