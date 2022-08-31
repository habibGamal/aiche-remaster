import React from 'react'
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { Avatar, Badge, Card } from 'antd';
import { Article, ArticleDB } from '../../Models/Article';
import { Link } from '@inertiajs/inertia-react';
export default function Index({ articlesDB }: { articlesDB: ArticleDB[] }) {
    const { Meta } = Card;
    const articles = articlesDB.map(article => new Article(article));
    return (
        <div className="container my-16">
            <div className="flex gap-4 flex-wrap">
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
                                actions={[
                                    <Link href={`/articles/${article.id}`} method="delete">
                                        <DeleteOutlined key="delete" />
                                    </Link>,
                                    <Link href={`/articles/${article.id}/edit`}>
                                        <EditOutlined key="edit" />
                                    </Link>,
                                    <Badge count={5} size="small">
                                        <EyeOutlined key="visits" />
                                    </Badge>
                                ]}
                            >
                                <Link href={`/articles/${article.id}`}>
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
    )
}
