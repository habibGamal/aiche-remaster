import React from "react";
import { EditOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { Badge, Card } from "antd";
import { Article, ArticleDB } from "../../Models/Article";
import { Link } from "@inertiajs/inertia-react";
import { BACKGROUNDS_IMAGES_PATH } from "../../Config";
import {
    ExternalArticle,
    ExternalArticleDB,
} from "../../Models/ExternalArticle";
import Auth from "../../Components/Common/Auth";
import {
    ArticleCategory,
    ArticleCategoryDB,
} from "../../Models/ArticleCategory";
export default function Index({
    externalArticlesDB,
    categoryDB,
}: {
    externalArticlesDB: ExternalArticleDB[];
    categoryDB: ArticleCategoryDB;
}) {
    const { Meta } = Card;
    const articles = externalArticlesDB.map(
        (article) => new ExternalArticle(article)
    );
    const category = new ArticleCategory(categoryDB);
    return (
        <section>
            <div
                className="w-full min-h-[350px] bg-cover bg-no-repeat relative grid place-items-center p-4 bg-center"
                style={{ backgroundImage: `url(${category.cover})` }}
            >
                <h2 className="relative z-10 text-4xl text-center sm:text-6xl font-bold border-b-4 border-second text-white">
                    {category.name}
                </h2>
                <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
            </div>
            <div className="container my-16">
                <div className="flex gap-4 flex-wrap items-start">
                    {articles.map((article) => (
                        <Card
                            key={article.id}
                            style={{ width: 300 }}
                            cover={
                                <img
                                    alt="example"
                                    className="w-full aspect-square object-cover"
                                    src={article.cover}
                                />
                            }
                            actions={[
                                <Auth>
                                    <Link
                                        href={ExternalArticle.delete(
                                            article.id
                                        )}
                                        method="delete"
                                    >
                                        <DeleteOutlined key="delete" />
                                    </Link>
                                </Auth>,
                                <Auth>
                                    <Link
                                        href={ExternalArticle.edit(article.id)}
                                    >
                                        <EditOutlined key="edit" />
                                    </Link>
                                </Auth>,
                                <Auth>
                                    <p className="mb-0">
                                        Pariority: {article.order + 1}
                                    </p>
                                </Auth>,
                            ]}
                        >
                            <a target="_blank" href={article.link}>
                                <Meta title={article.title} />
                            </a>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
