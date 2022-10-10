import { Link } from '@inertiajs/inertia-react'
import { Menu } from 'antd'
import { ReadOutlined, EditOutlined, DatabaseOutlined, LoginOutlined, HomeOutlined, InfoCircleOutlined, ControlOutlined, PlusCircleOutlined, ApartmentOutlined } from '@ant-design/icons';
import React from 'react'
import { LOGO_IMAGES_PATH } from './Config';
import { ArticleCategory } from './Models/ArticleCategory';
import { Article } from './Models/Article';
import { Inertia } from '@inertiajs/inertia';
import { Member } from './Models/Member';
import { Committe } from './Models/Committe';
import { AppConfig } from './Models/AppConfig';
import { ExternalArticle } from './Models/ExternalArticle';

export default function Layout(props: { children: JSX.Element }) {
    return (
        <>
            <nav className="bg-main sticky top-0 py-2 z-50 shadow-lg">
                <div className="container">
                    <div className="flex justify-between items-center">
                        <Link href='/'>
                            <img className="w-[50px] aspect-square" src={LOGO_IMAGES_PATH + 'aiche_logo_black.png'} alt="" />
                        </Link>
                        <Menu mode="horizontal" className='!bg-transparent !text-white w-[54px] sm:w-auto' >
                            <Menu.Item onClick={() => Inertia.get('/')} key="home" icon={<HomeOutlined />}>
                                Home
                            </Menu.Item>
                            <Menu.Item onClick={() => Inertia.get('/about')} key="about" icon={<InfoCircleOutlined />}>
                                About
                            </Menu.Item>
                            <Menu.SubMenu key="articles" title="Articles" icon={<ReadOutlined />}>
                                <Menu.Item key="create_external_article" icon={<EditOutlined />}>
                                    <Link href={ExternalArticle.create()}>
                                        Create External Article
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="create_article" icon={<EditOutlined />}>
                                    <Link href={Article.create()}>
                                        Create Article
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="create_category" icon={<ApartmentOutlined />}>
                                    <Link href={ArticleCategory.create()}>
                                        Create Category
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="read_articles" icon={<DatabaseOutlined />}>
                                    <Link href={ArticleCategory.index()}>
                                        Read
                                    </Link>
                                </Menu.Item>
                            </Menu.SubMenu>
                            <Menu.SubMenu key="control" title="Control" icon={<ControlOutlined />}>
                                <Menu.Item key="add_member" icon={<PlusCircleOutlined />}>
                                    <Link href={Member.create()}>
                                        Add Member
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="add_committee" icon={<PlusCircleOutlined />}>
                                    <Link href={Committe.create()}>
                                        Add Committe
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="slider" icon={<PlusCircleOutlined />}>
                                    <Link href={AppConfig.editSlider()}>
                                        Slider
                                    </Link>
                                </Menu.Item>
                            </Menu.SubMenu>
                            <Menu.Item key="6" icon={<LoginOutlined />}>
                                <Link href='/login'>
                                    Login
                                </Link>
                            </Menu.Item>
                        </Menu>
                    </div>
                </div>
            </nav>
            {props.children}

            <div className="my-32">d</div>
        </>
    )
}

