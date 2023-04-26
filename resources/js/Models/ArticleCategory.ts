import { Model } from "../Core/Model";

export enum ArticleCategoryType {
    ExternalArticles = "external_articles",
    Articles = "articles",
}
export type ArticleCategoryDB = {
    id: number;
    name: string;
    cover: string;
    type: "external_articles" | "articles";
    order: number;
};

export class ArticleCategory extends Model {
    public id: number;
    public name: string;
    private _cover: string;
    public order: number;
    private _type: "external_articles" | "articles";
    static slug = "/article-categories";
    constructor(articleCategory: ArticleCategoryDB) {
        super();
        this.id = articleCategory.id;
        this.name = articleCategory.name;
        this._cover = articleCategory.cover;
        this._type = articleCategory.type;
        this.order = articleCategory.order;
    }
    public get cover() {
        return "/storage/images/" + this._cover;
    }
    public get coverName() {
        return this._cover;
    }
    public get absCoverURI() {
        return window.location.origin + "/storage/images/" + this._cover;
    }
    public get type() {
        if (this._type === "external_articles")
            return ArticleCategoryType.ExternalArticles;
        if (this._type === "articles") return ArticleCategoryType.Articles;
    }
}
