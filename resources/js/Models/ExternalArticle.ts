import { BACKGROUNDS_IMAGES_PATH } from "../Config";
import { Model } from "../Core/Model";

export type ExternalArticleDB = {
    id: number,
    title: string,
    link: string,
    cover: string,
    category_id: number,
    order:number,
}

export class ExternalArticle extends Model {
    public id: number;
    public title: string;
    private _cover: string;
    public link: string;
    public categoryId: number;
    public order:number;
    static slug = '/external-articles';
    constructor(article: ExternalArticleDB) {
        super();
        this.id = article.id;
        this.title = article.title;
        this._cover = article.cover;
        this.link = article.link;
        this.categoryId = article.category_id;
        this.order = article.order;
    }
    public get cover() {
        return this._cover ? '/storage/images/' + this._cover: BACKGROUNDS_IMAGES_PATH + 'pdf.png';
    }
    public get coverName() {
        return this._cover
    }
    public get absCoverURI() {
        return window.location.origin + '/storage/images/' + this._cover
    }
}
