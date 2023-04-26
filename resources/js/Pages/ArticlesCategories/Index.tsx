import React from "react";
import { Button, Card, Empty, message, Popconfirm } from "antd";
import { Link } from "@inertiajs/inertia-react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { BACKGROUNDS_IMAGES_PATH } from "../../Config";
import {
    ArticleCategory,
    ArticleCategoryDB,
} from "../../Models/ArticleCategory";
import { Inertia } from "@inertiajs/inertia";
import Auth from "../../Components/Common/Auth";
export default function Index({
    articleCategoriesDB,
}: {
    articleCategoriesDB: ArticleCategoryDB[];
}) {
    const articleCategories = articleCategoriesDB.map(
        (category) => new ArticleCategory(category)
    );
    const deleteCategory = (id: number) => {
        Inertia.delete(ArticleCategory.delete(id), {
            onSuccess: () => {
                message.info("Category is deleted successfuly");
            },
        });
    };

    return (
        <section>
            <div
                className="w-full min-h-[350px] xl:min-h-[450px] bg-cover bg-no-repeat relative grid place-items-center p-4 bg-center"
                style={{
                    backgroundImage: `url(${
                        BACKGROUNDS_IMAGES_PATH + "articles.jpg"
                    })`,
                }}
            >
                <h2 className="relative z-10 text-4xl text-center sm:text-6xl font-bold border-b-4 border-second text-white">
                    Our <span className="header-highlight"> Articles</span>
                </h2>
                <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
            </div>
            <div className="container my-16">
                <div className="flex flex-wrap gap-8 justify-evenly">
                    {articleCategories.map((category) => (
                        <>
                            <div className="rounded shadow relative w-full lg:w-[40%] xl:w-[30%] cursor-pointer article-category">
                                <h4 className="text-xl bg-second text-white py-1 px-2  absolute rounded-r top-4 shadow z-20">
                                    {category.name}
                                </h4>
                                <Auth>
                                    <h3 className="text-xl bg-main text-white py-1 px-2  absolute rounded-r top-4 shadow z-20 right-0">
                                        Priority {category.order + 1}
                                    </h3>
                                </Auth>
                                <div
                                    onClick={() =>
                                        Inertia.get(
                                            ArticleCategory.show(category.id)
                                        )
                                    }
                                    className="cover"
                                >
                                    <img
                                        className="w-full"
                                        src={category.cover}
                                    />
                                </div>
                                <Auth>
                                    <div className="actions flex justify-evenly p-4">
                                        <Button
                                            onClick={() =>
                                                Inertia.get(
                                                    ArticleCategory.edit(
                                                        category.id
                                                    )
                                                )
                                            }
                                            type="link"
                                            icon={<EditOutlined key="edit" />}
                                        />
                                        <Popconfirm
                                            title="Are you sure to delete this Category?"
                                            onConfirm={() =>
                                                deleteCategory(category.id)
                                            }
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <Button
                                                type="link"
                                                icon={
                                                    <DeleteOutlined key="delete" />
                                                }
                                            />
                                        </Popconfirm>
                                    </div>
                                </Auth>
                            </div>
                        </>
                    ))}
                    {articleCategories.length === 0 && <Empty />}
                </div>
            </div>
        </section>
    );
}
