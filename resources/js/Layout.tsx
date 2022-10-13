import { Link, usePage } from '@inertiajs/inertia-react'
import { Menu, MenuProps, message } from 'antd'
import { ReadOutlined, EditOutlined, DatabaseOutlined, LoginOutlined, HomeOutlined, InfoCircleOutlined, ControlOutlined, PlusCircleOutlined, ApartmentOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react'
import { LOGO_IMAGES_PATH } from './Config';
import { ArticleCategory } from './Models/ArticleCategory';
import { Article } from './Models/Article';
import { Inertia } from '@inertiajs/inertia';
import { Member } from './Models/Member';
import { Committe } from './Models/Committe';
import { AppConfig } from './Models/AppConfig';
import { ExternalArticle } from './Models/ExternalArticle';

const items: MenuProps['items'] = [
    {
        label: 'Home',
        key: 'home',
        icon: <HomeOutlined />,
        onClick: () => Inertia.get('/'),
    },
    {
        label: 'About',
        key: 'about',
        icon: <InfoCircleOutlined />,
        onClick: () => Inertia.get('/about'),
    },
    {
        label: 'Articles',
        key: 'articles',
        icon: <ReadOutlined />,
        children: [
            {
                label: (
                    <Link href={ExternalArticle.create()}>
                        Create External Article
                    </Link>
                ),
                key: 'create_external_article',
                icon: <EditOutlined />,
            },

            {
                label: (
                    <Link href={Article.create()}>
                        Create Article
                    </Link>
                ),
                key: 'create_article',
                icon: <EditOutlined />,
            },
            {
                label: (
                    <Link href={ArticleCategory.create()}>
                        Create Category
                    </Link>
                ),
                key: 'create_category',
                icon: <ApartmentOutlined />,
            },
            {
                label: (
                    <Link href={ArticleCategory.index()}>
                        Read
                    </Link>
                ),
                key: 'read_articles',
                icon: <ApartmentOutlined />,
            },
        ],
    },
    {
        label: 'Control',
        key: 'control',
        icon: <ControlOutlined />,
        children: [
            {
                label: (
                    <Link href={Member.create()}>
                        Add Member
                    </Link>
                ),
                key: 'add_member',
                icon: <PlusCircleOutlined />,
            },

            {
                label: (
                    <Link href={Committe.create()}>
                        Add Committe
                    </Link>
                ),
                key: 'add_committee',
                icon: <PlusCircleOutlined />,
            },
            {
                label: (
                    <Link href={AppConfig.editSlider()}>
                        Slider
                    </Link>
                ),
                key: 'slider',
                icon: <PlusCircleOutlined />,
            },
        ],
    },
];
export default function Layout(props: { children: JSX.Element }) {
    useEffect(() => {
        let loading: any;
        Inertia.on('start', () => {
            loading = message.loading('', 0);
        })
        Inertia.on('finish', () => {
            setTimeout(loading)
        })
    }, [])
    const [current, setCurrent] = useState('mail');

    const onClick: MenuProps['onClick'] = e => {
        setCurrent(e.key);
    };
    const { auth } = usePage().props;
    console.log(auth);

    const authLink = auth ?
        {
            label: 'Logout',
            key: 'logout',
            icon: <LoginOutlined />,
            onClick: () => Inertia.get('/logout'),
        } :
        {
            label: 'Login',
            key: 'login',
            icon: <LoginOutlined />,
            onClick: () => Inertia.get('/login'),
        }
    return (
        <>
            <nav className="bg-main sticky top-0 py-2 z-50 shadow-lg">
                <div className="container">
                    {/* <div className="flex justify-between items-center"> */}
                    <div className="grid grid-cols-2">
                        <Link href='/'>
                            <img className="w-[50px] aspect-square" src={LOGO_IMAGES_PATH + 'aiche_logo_black.png'} alt="" />
                        </Link>
                        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" className="!bg-transparent !text-white !border-b-0 justify-end" items={[...items!, authLink]} />

                    </div>
                </div>
            </nav>
            {props.children}

            <div className="my-32">d</div>
        </>
    )
}

