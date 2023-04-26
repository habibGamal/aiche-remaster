import { Inertia } from '@inertiajs/inertia';
import { Button, Empty, message, Popconfirm } from 'antd';
import React from 'react'
import { ArticleCategory, ArticleCategoryDB } from '../../Models/ArticleCategory';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Auth from '../Common/Auth';
import Service from './Service'

export default function Services({ articleCategoriesDB }: { articleCategoriesDB: ArticleCategoryDB[] }) {
    const articleCategories = articleCategoriesDB.map(category => new ArticleCategory(category));
    const deleteCategory = (id: number) => {
        Inertia.delete(
            ArticleCategory.delete(id),
            {
                onSuccess: () => {
                    message.info('Category is deleted successfuly');
                }
            })
    }
    const services = [
        {
            name: 'Blogs',
            src: 'blog.jpg',
            href: '#'
        },
        {
            name: 'Design Your CV',
            src: 'cv.jpg',
            href: '#'
        },
        {
            name: 'Our Library',
            src: 'library.jpg',
            href: '#'
        },
        {
            name: 'Our Magazine',
            src: 'spark2022.jpg',
            href: '#'
        },
    ]
    return (
        <section className="my-16">
            <div className="container">
                <h2 className="section-title">Our  <span className="header-highlight">Articles</span></h2>
                {
                    articleCategories.length === 0 &&
                    <Empty className="mx-auto" />
                }
                <div className="flex flex-wrap gap-8 justify-evenly">
                    {
                        articleCategories.map(category =>
                            <>
                                <div className="rounded shadow relative w-full lg:w-[40%] xl:w-[30%] cursor-pointer article-category">
                                    <h4 className="text-xl bg-second text-white py-1 px-2  absolute rounded-r top-4 shadow z-20">{category.name}</h4>
                                    <div  onClick={() => Inertia.get(ArticleCategory.show(category.id))} className="w-full cover">
                                        <img src={category.cover} />
                                    </div>
                                    <Auth>
                                        <div className="actions flex justify-evenly p-4">
                                            <Button onClick={() => Inertia.get(ArticleCategory.edit(category.id))} type='link' icon={<EditOutlined key="edit" />} />
                                            <Popconfirm
                                                title="Are you sure to delete this Category?"
                                                onConfirm={() => deleteCategory(category.id)}
                                                okText="Yes"
                                                cancelText="No"
                                            >

                                                <Button type='link' icon={<DeleteOutlined key="delete" />} />

                                            </Popconfirm>
                                        </div>
                                    </Auth>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </section>
    )
}
