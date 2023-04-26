import React from "react";
import { EditOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { Badge, Card } from "antd";
import { Article, ArticleDB } from "../../Models/Article";
import { Link, usePage } from "@inertiajs/inertia-react";
import { BACKGROUNDS_IMAGES_PATH } from "../../Config";
import {
    ArticleCategory,
    ArticleCategoryDB,
} from "../../Models/ArticleCategory";
export default function Index({
    articlesDB,
    categoryDB,
}: {
    articlesDB: ArticleDB[];
    categoryDB: ArticleCategoryDB;
}) {
    const { Meta } = Card;
    const articles = articlesDB.map((article) => new Article(article));
    const { auth } = usePage().props;
    const category = new ArticleCategory(categoryDB);
    console.log(category);
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
                            actions={
                                auth
                                    ? [
                                          <Link
                                              href={Article.delete(article.id)}
                                              method="delete"
                                          >
                                              <DeleteOutlined key="delete" />
                                          </Link>,
                                          <Link href={Article.edit(article.id)}>
                                              <EditOutlined key="edit" />
                                          </Link>,
                                          <p className="mb-0">
                                              Pariority: {article.order + 1}
                                          </p>,
                                      ]
                                    : []
                            }
                        >
                            <Link href={Article.show(article.id)}>
                                <Meta
                                    title={article.title}
                                    description={article.description}
                                />
                            </Link>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
