import { Model } from "../Core/Model";

export type SliderDB = {
    id: number,
    path:string,
    link:string,
}

export class Slider extends Model {
    public id: number;
    private _path: string;
    public link: string;
    static slug = '/slider';
    constructor(slider: SliderDB) {
        super();
        this.id = slider.id;
        this._path = slider.path;
        this.link = slider.link;
    }
    public get path() {
        return '/storage/images/' + this._path;
    }
    public get pathFileName() {
        return this._path
    }
}
