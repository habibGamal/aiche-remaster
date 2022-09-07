import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faPerson, faGlobe, faHandshake, faChevronRight, faLightbulb, faAddressBook, faMicrophone, faBook } from '@fortawesome/free-solid-svg-icons';
import { faAndroid, faFreeCodeCamp } from '@fortawesome/free-brands-svg-icons';
import Committee from './Committee';
export default function Committees() {
    const committees = [
        {
            icon: faCode,
            name: 'Website',
            description:
                [
                    `Managing and upgrading our website.`,
                    `Responsible for creating online recruitment form, trainings form, online surveys, courses form and any form related to our events.`,
                    `Working on raising our website reach and knowing how to get benefits from that.`,
                ]
        },
        {
            icon: faFreeCodeCamp,
            name: 'DP',
            description:
                [
                    `Responsible for our offline marketing in Suez University`,
                    `Booking and delivering events tickets`,
                    `Practicing their publicity duties at our booth (if existed)`,
                ]
        },
        {
            icon: faPerson,
            name: 'HRD',
            description:

                [
                    `Responsible for the members’ development by presenting non - technical sessions.`,
                    `Providing workshops to practice the presented sessions and prepare a summarized report for each session.`,
                ]
        },
        {
            icon: faGlobe,
            name: 'Multimedia',
            description:
                [
                    `Responsible for any needed graphic designs.`,
                    `Responsible for making designs of our packages and printings.`,
                    `Responsible for creating our online events and marketing for our programs.`,
                    `Responsible for making motion graphic videos and designing our magazine.`,
                    `Responsible for posting any update and creating non-technical content for all social media platforms and event.`,
                    `Improving our Facebook, twitter, Instagram and YouTube accounts’ reach and marketing for them.`,
                ]
        },
        {
            icon: faHandshake,
            name: 'PR&FR',
            description:
                [
                    `Providing field trips and winter and summer trainings.`,
                    `Providing technical courses by communicating with instructors.`,
                    `Completing deals with sponsor(s), e.g. catering, media coverage, incash, etc. for our events.`,
                    `Finding and contacting potential sponsors for our reference and our magazine.`,
                ]
        },
        {
            icon: faGlobe,
            name: 'HRM',
            description:
                [
                    `Responsible for ground and online recruitment, reposition and hunting.`,
                    `Responsible for filtration, screening and selecting processes.`,
                    `Responsible for the reviewing process through KPIs and evaluations.`,
                ]
        },
        {
            icon: faAndroid,
            name: 'Mobile Application',
            description:
                [
                    `Managing and upgrading our android application.`,
                    `Expanding our application and launching it through App Store .`,
                    `Responsible for uploading our magazine, ARChE, ATB and AIChE Capsules to our application.`,
                    `Working on raising our application reach and knowing how to get benefits from that.`,
                ]
        },
        {
            icon: faLightbulb,
            name: 'Survey',
            description:
                [
                    `Conducting online and offline surveys about our courses and events`,
                    `Cooperating with the HRM committee in discussing possible solutions for people problems and complains`,
                ]
        },
        {
            icon: faAddressBook,
            name: 'OC',
            description:
                [
                    `Responsible for the logistics of any event.`,
                    `Responsible for our package deals.`,
                    `Organizing our event, courses, trainings, conferences, meetings and parties.`,
                    `Responsible for any extraordinary activities.`,
                ]
        },
        {
            icon: faMicrophone,
            name: 'Voice Over',
            description:
                [
                    `Are responsible for producing audio and video content for chapter social media platforms. `,
                    `Our goal is to encourage self-learning by providing unique and simple video content that enriches our followers' technical information in the field of oil and gas or even on the side of developing their personal skills.`,
                ]
        },
        {
            icon: faBook,
            name: 'Technical',
            description:
                [
                    `Providing the required data for our campaigns.`,
                    `Integrating with other committees by presenting technical sessions.`,
                    `Implementing AIChE Refining Zone program.`,
                    `Working on revising our reference and finishing the missed parts.`,
                    `Responsible for developing ATB and AIChE Capsules.`,
                    `Providing articles, case studies and interviews for our magazine.`,
                ]
        },
        {
            icon: faHandshake,
            name: 'IR',
            description:
                [
                    `Responsible Making new partnerships with AIChE chapters all over the world, Branding of Magazines internationally and nationally, increasing the student's awareness about Personal Branding, and Supplying students with necessary information about international conferences, competitions, and paper contests and how they can engage with them.`
                ]
        },
    ]
    return (
        <section className="my-16">
            <div className="container">
                <h2 className="section-title">Our  <span className="header-highlight">Committees</span></h2>
                <div className="columns-1 md:columns-2 lg:columns-3 justify-evenly">
                    {
                        committees.map((committee, i) =>
                            <Committee key={i} committee={committee} />
                        )
                    }
                </div>
            </div>
        </section>
    )
}
