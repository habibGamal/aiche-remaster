import { Link } from '@inertiajs/inertia-react'
import React from 'react'
import { ABOUT_IMAGES_PATH, BACKGROUNDS_IMAGES_PATH } from '../Config'
import { FacebookOutlined, LinkedinOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Member, MemberDB } from '../Models/Member'
import { Card, Popconfirm } from 'antd'
import Meta from 'antd/lib/card/Meta'
import MemberDisplay from '../Components/About/MemberDisplay'

export default function About({ membersDB }: { membersDB: MemberDB[] }) {
    const members = membersDB.map(member => new Member(member));
    return (
        <section>
            <div className="bg-main">
                <div className="container">
                    <div className="grid grid-cols-2 items-center justify-between">
                        <div>
                            <h2 className="text-6xl font-bold text-white">About <span className="header-highlight"> Us</span></h2>
                            <p className="text-xl text-gray-100">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora excepturi nisi vitae explicabo, nostrum quia quis. At repellat nesciunt deleniti distinctio veniam, vero iste tenetur iusto eaque placeat officia quasi.</p>
                        </div>
                        <div>
                            <img className="w-[500px] aspect-square object-contain mx-auto" src={BACKGROUNDS_IMAGES_PATH + 'about.png'} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="container my-16">
                <h2 className="border-l-4 border-main bg-gray-200 text-3xl p-2 w-fit">Who We <span className="header-highlight">Are</span></h2>
                <div className="grid sm:grid-cols-3 gap-12 items-center">
                    <div className="sm:col-span-2 text-xl">
                        <p>
                            AIChE stands for " American Institute of Chemical Engineers". It is the world's leading organization for chemical engineering professionals. It's a nonprofit organization with more than 60,000 members from over 110 countries worldwide.
                        </p>
                        <p>
                            AIChE, Suez University Student Chapter (AIChE SUSC) was founded in 2013 as a branch from AIChE International, and it includes a group of undergraduate students, dedicated to the advancement of academic learning techniques, and personal development systems, trying to create links between the university and the industry.
                        </p>
                    </div>
                    <img className="shadow-xl w-[40vw]  object-contain " src={ABOUT_IMAGES_PATH + 'aiche_international.svg'} alt="" />
                </div>
            </div>
            <div className="container my-16">
                <h2 className="border-l-4 border-main bg-gray-200 text-3xl p-2 w-fit">Our  <span className="header-highlight">Mission</span></h2>
                <div className="grid sm:grid-cols-3 gap-12 items-center">
                    <div className="sm:col-span-2 text-xl">
                        <p>
                            Increasing technical and non-technical knowledge of AIChE SUSU members.
                            Refreshing the concept of volunteering work within all AIChE SUSC leaders and members.
                            Raising the spirit and passion of all AIChE SUSC members.
                        </p>
                        <p>
                            Expanding our brand in Suez university and refining related companies.
                            Removing the barriers between the leader and the members.
                        </p>
                    </div>
                    <img className="shadow-xl w-[40vw]  object-contain " src={ABOUT_IMAGES_PATH + 'mission.jpg'} alt="" />
                </div>
            </div>
            <div className="container my-16">
                <h2 className="border-l-4 border-main bg-gray-200 text-3xl p-2 w-fit">Our  <span className="header-highlight">Vision</span></h2>
                <div className="grid sm:grid-cols-3 gap-12 items-center">
                    <div className="sm:col-span-2 text-xl">
                        <p>
                            Volunteerism can be divided into two parts: Volunteering Work itself and Volunteers. If we want to promote volunteerism, we should develop these two parts together. Volunteering work development can be achieved by finding the smartest, quickest and most a ccurate way to do the needed job. Volunteers’ development can be achieved by improving both technical knowledge and non-technical skills of the volunteers to be ready for after graduation life.
                        </p>
                    </div>
                    <img className="shadow-xl w-[40vw]  object-contain " src={ABOUT_IMAGES_PATH + 'vision.jpg'} alt="" />
                </div>
            </div>
            <div className="container my-16">
                <h2 className="border-l-4 border-main bg-gray-200 text-3xl p-2 w-fit">Our  <span className="header-highlight">Team</span></h2>
                <div className="flex flex-wrap gap-8 items-start justify-center">
                    {
                        Member.getTeam(members).map(
                            member =>
                                <MemberDisplay key={member.id} member={member} />
                        )
                    }
                </div>
            </div>
            <div className="container my-16">
                <h2 className="border-l-4 border-main bg-gray-200 text-3xl p-2 w-fit">High  <span className="header-highlight">Board</span></h2>
                <div className="flex flex-wrap gap-8 items-start  justify-center">
                    {
                        Member.getHighBoard(members).map(
                            member =>
                                <MemberDisplay key={member.id} member={member} />
                        )
                    }
                </div>
            </div>
            <div className="container my-16">
                <h2 className="border-l-4 border-main bg-gray-200 text-3xl p-2 w-fit">Our  <span className="header-highlight">Board</span></h2>
                <div className="flex flex-wrap gap-8 items-start  justify-center">
                    {
                        Member.getBoard(members).map(
                            member =>
                                <MemberDisplay key={member.id} member={member} />
                        )
                    }
                </div>
            </div>
        </section >
    )
}
