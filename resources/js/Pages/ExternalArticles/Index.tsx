import React from 'react'
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { Badge, Card } from 'antd';
import { Article, ArticleDB } from '../../Models/Article';
import { Link } from '@inertiajs/inertia-react';
import { BACKGROUNDS_IMAGES_PATH } from '../../Config';
import { ExternalArticle, ExternalArticleDB } from '../../Models/ExternalArticle';
import Auth from '../../Components/Common/Auth';
export default function Index({ externalArticlesDB }: { externalArticlesDB: ExternalArticleDB[], }) {
    const { Meta } = Card;
    const articles = externalArticlesDB.map(article => new ExternalArticle(article));

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
                                            className="w-full aspect-square object-contain"
                                            src={article.cover}
                                        />
                                    }
                                    actions={[
                                        <Auth>
                                            <Link href={ExternalArticle.delete(article.id)} method="delete">
                                                <DeleteOutlined key="delete" />
                                            </Link>
                                        </Auth>
                                        ,
                                        <Auth>
                                            <Link href={ExternalArticle.edit(article.id)}>
                                                <EditOutlined key="edit" />
                                            </Link>
                                        </Auth>
                                    ]}
                                >
                                    <a target="_blank" href={article.link}>
                                        <Meta
                                            title={article.title}
                                        />
                                    </a>
                                </Card>
                        )
                    }
                </div>
            </div>
        </section>
    )
}
