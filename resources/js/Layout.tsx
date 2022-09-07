import { Link } from '@inertiajs/inertia-react'
import { Menu } from 'antd'
import { ReadOutlined, EditOutlined, DatabaseOutlined, LoginOutlined } from '@ant-design/icons';
import React from 'react'
import { LOGO_IMAGES_PATH } from './AppConfig';

export default function Layout(props: { children: JSX.Element }) {
    return (
        <>
            <nav className="bg-main sticky top-0 py-2 z-50 shadow-lg">
                <div className="container">
                    <div className="flex justify-between items-center">
                        <img className="w-[50px] aspect-square" src={LOGO_IMAGES_PATH + 'aiche_logo_black.png'} alt="" />
                        <Menu mode="horizontal" className='!bg-transparent !text-white' >
                            <Menu.SubMenu key="SubMenu" title="Articles" icon={<ReadOutlined />}>
                                <Menu.Item key="2" icon={<EditOutlined />}>
                                    <Link href="/articles/create">
                                        Create
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="3" icon={<DatabaseOutlined />}>
                                    <Link href="/articles">
                                        Read
                                    </Link>
                                </Menu.Item>
                            </Menu.SubMenu>
                            <Menu.Item className='bg-transparent' key="1" icon={<LoginOutlined />}>
                                Login
                            </Menu.Item>
                        </Menu>
                    </div>
                </div>
            </nav>
            {props.children}
        </>
    )
}

