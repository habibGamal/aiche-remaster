import { Link } from '@inertiajs/inertia-react'
import React from 'react'
import { ABOUT_IMAGES_PATH, BACKGROUNDS_IMAGES_PATH } from '../Config'
import { FacebookOutlined, LinkedinOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Member, MemberDB } from '../Models/Member'
import { Button, Card, Empty, Popconfirm } from 'antd'
import Meta from 'antd/lib/card/Meta'
import MemberDisplay from '../Components/About/MemberDisplay'
import { AppConfig, AppConfigDB } from '../Models/AppConfig'
import ChangeVision from '../Components/Modals/ChangeVision'
import useModalProps from '../Hooks/useModalProps'
import Auth from '../Components/Common/Auth'


function AboutSection({ title, text, img }: { title: React.ReactNode, text: React.ReactNode, img: string }) {
    return (
        <div className="container my-16">
            <h2 className="border-l-4 border-main bg-gray-200 text-3xl p-2 w-fit">{title}</h2>
            <div className="grid sm:grid-cols-2 gap-12 items-start p-4">
                <div className=" text-xl">
                    {text}
                </div>
                <img className="shadow-xl max-h-[200px] w-full object-cover rounded" src={img} alt="" />
            </div>
        </div>
    );
}


export default function About({ membersDB, visionDB }: { membersDB: MemberDB[], visionDB: AppConfigDB }) {
    const members = membersDB.map(member => new Member(member));
    const vision = (new AppConfig(visionDB)).vision();
    const changeVisionModal = useModalProps();

    return (
        <>
            <ChangeVision {...changeVisionModal.modalProps} vision={vision} />
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
                <AboutSection
                    title={(<>Who We <span className="header-highlight">Are</span></>)}
                    text={(
                        <>
                            <p>
                                AIChE stands for " American Institute of Chemical Engineers". It is the world's leading organization for chemical engineering professionals. It's a nonprofit organization with more than 60,000 members from over 110 countries worldwide.
                            </p>
                            <p>
                                AIChE, Suez University Student Chapter (AIChE SUSC) was founded in 2013 as a branch from AIChE International, and it includes a group of undergraduate students, dedicated to the advancement of academic learning techniques, and personal development systems, trying to create links between the university and the industry.
                            </p>
                        </>
                    )}
                    img={ABOUT_IMAGES_PATH + 'aiche_international.svg'}
                />

                <AboutSection
                    title={(<>Our <span className="header-highlight">Mision</span></>)}
                    text={(
                        <>
                            <p>
                                Increasing technical and non-technical knowledge of AIChE SUSU members.
                                Refreshing the concept of volunteering work within all AIChE SUSC leaders and members.
                                Raising the spirit and passion of all AIChE SUSC members.
                            </p>
                            <p>
                                Expanding our brand in Suez university and refining related companies.
                                Removing the barriers between the leader and the members.
                            </p>
                        </>
                    )}
                    img={ABOUT_IMAGES_PATH + 'mission.jpg'}
                />

                <AboutSection
                    title={(
                        <>
                            Our <span className="header-highlight">Vision</span>
                            <Auth>
                                <Button type='link' size='large' icon={<EditOutlined />} onClick={() => changeVisionModal.open()} />
                            </Auth>
                        </>
                    )}
                    text={(
                        <>
                            <h3 className="rounded bg-main text-white w-fit p-4">{vision.vision}</h3>
                            <p>{vision.vision_description}</p>
                        </>
                    )}
                    img={ABOUT_IMAGES_PATH + 'vision.jpg'}
                />
                <div className="container my-16">
                    <h2 className="border-l-4 border-main bg-gray-200 text-3xl p-2 w-fit">Our  <span className="header-highlight">Team</span></h2>
                    <div className="flex flex-wrap gap-8 items-start justify-center">
                        {Member.getTeam(members).length === 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
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
                        {Member.getHighBoard(members).length === 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
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
                        {Member.getBoard(members).length === 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
                        {
                            Member.getBoard(members).map(
                                member =>
                                    <MemberDisplay key={member.id} member={member} />
                            )
                        }
                    </div>
                </div>
            </section >
        </>
    )
}
