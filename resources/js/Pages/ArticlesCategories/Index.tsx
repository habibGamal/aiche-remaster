import React from 'react'
import { Button, Card, message, Popconfirm } from 'antd';
import { Link } from '@inertiajs/inertia-react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { BACKGROUNDS_IMAGES_PATH } from '../../Config';
import { ArticleCategory, ArticleCategoryDB } from '../../Models/ArticleCategory';
import { Inertia } from '@inertiajs/inertia';
export default function Index({ articleCategoriesDB }: { articleCategoriesDB: ArticleCategoryDB[] }) {
    const { Meta } = Card;
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
    return (
        <section>
            <div className="bg-main">
                <div className="container">
                    <div className="grid grid-cols-2 items-center justify-between">
                        <div>
                            <h2 className="text-6xl font-bold text-white">Our <span className="header-highlight"> Articles</span></h2>
                            <p className="text-xl text-gray-100">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora excepturi nisi vitae explicabo, nostrum quia quis. At repellat nesciunt deleniti distinctio veniam, vero iste tenetur iusto eaque placeat officia quasi.</p>
                        </div>
                        <div>
                            <img className="w-[500px] aspect-square object-contain mx-auto" src={BACKGROUNDS_IMAGES_PATH + 'articles.png'} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="container my-16">
                <div className="grid grid-cols-4 items-start gap-4">
                    {
                        articleCategories.map(category =>
                            <>
                                <div className="rounded shadow relative min-w-[300px] cursor-pointer article-category">
                                    <h4 className="text-xl bg-second text-white py-1 px-2  absolute rounded-r top-4 shadow z-20">{category.name}</h4>
                                    <div onClick={()=>Inertia.get(ArticleCategory.show(category.id))} className="cover">
                                        <img src={category.cover} />
                                    </div>
                                    <div className="actions flex justify-evenly p-4">
                                        <Button onClick={()=>Inertia.get(ArticleCategory.edit(category.id))} type='link' icon={<EditOutlined key="edit" />} />
                                        <Popconfirm
                                            title="Are you sure to delete this Category?"
                                            onConfirm={() => deleteCategory(category.id)}
                                            okText="Yes"
                                            cancelText="No"
                                        >

                                            <Button  type='link' icon={<DeleteOutlined key="delete" />} />

                                        </Popconfirm>
                                    </div>

                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </section>
    )
}
