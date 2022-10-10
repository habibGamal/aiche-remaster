import { Model } from "../Core/Model";

export type ArticleDB = {
    id: number,
    title: string,
    cover: string,
    description: string,
    content: string,
    category_id: number,
    created_at: string,
    updated_at: string,
}

export class Article extends Model {
    public id: number;
    public title: string;
    private _cover: string;
    public description: string;
    public content: string;
    public categoryId: number;
    static slug = '/articles';
    constructor(article: ArticleDB) {
        super();
        this.id = article.id;
        this.title = article.title;
        this._cover = article.cover;
        this.description = article.description;
        this.content = article.content;
        this.categoryId = article.category_id;
    }
    public get cover() {
        return '/storage/images/' + this._cover;
    }
    public get coverName() {
        return this._cover
    }
    public get absCoverURI() {
        return window.location.origin + '/storage/images/' + this._cover
    }
}
