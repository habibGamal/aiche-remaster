import React from 'react'
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { Badge, Card } from 'antd';
import { Article, ArticleDB } from '../../Models/Article';
import { Link, usePage } from '@inertiajs/inertia-react';
import { BACKGROUNDS_IMAGES_PATH } from '../../Config';
import { ArticleCategoryDB } from '../../Models/ArticleCategory';
import Auth from '../../Components/Common/Auth';
export default function Index({ articlesDB }: { articlesDB: ArticleDB[], }) {
    const { Meta } = Card;
    const articles = articlesDB.map(article => new Article(article));
    const { auth } = usePage().props;
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
                <div className="flex gap-4 flex-wrap items-start">
                    {
                        articles.map(
                            article =>
                                <Card
                                    key={article.id}
                                    style={{ width: 300 }}
                                    cover={
                                        <img
                                            alt="example"
                                            src={article.cover}
                                        />
                                    }
                                    actions={auth ? [
                                        <Link href={Article.delete(article.id)} method="delete">
                                            <DeleteOutlined key="delete" />
                                        </Link>,
                                        <Link href={Article.edit(article.id)}>
                                            <EditOutlined key="edit" />
                                        </Link>
                                    ] : []}
                                >
                                    <Link href={Article.show(article.id)}>
                                        <Meta
                                            title={article.title}
                                            description={article.description}
                                        />
                                    </Link>
                                </Card>
                        )
                    }
                </div>
            </div>
        </section>
    )
}
