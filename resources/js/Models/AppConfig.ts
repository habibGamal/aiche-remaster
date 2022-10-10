import { IMAGES_PATH } from "../Config";

export type AppConfigDB = {
    id: number,
    name: string,
    value: any,
}

export class AppConfig {
    public id: number;
    public name: string;
    private _value: any;
    private static slug = '/app-config';
    constructor(appConfig: AppConfigDB) {
        this.id = appConfig.id;
        this.name = appConfig.name;
        this._value = appConfig.value;
    }
    public sliderPhotos() {
        if (this.name == 'slider_photos') {
            const rawPaths = JSON.parse(this._value) as string[];
            return rawPaths.map(name => ({ path: '/storage/images/' + name, name }));
        }
        return null;
    }
    public presidentPhoto() {
        if (this.name == 'president_photo') {
            return '/storage/images/' + this._value;
        }
        return null;
    }
    static defaultPresidentPhoto() {
        return IMAGES_PATH + 'president.jpg'
    }
    // routes
    static updatePresidentPhoto() {
        return this.slug + '/update-president-photo';
    }
    static editSlider() {
        return this.slug + '/edit-slider';
    }
    static addSliderPhotos() {
        return this.slug + '/add-slider-photos';
    }
    static deleteSliderPhoto() {
        return this.slug + '/delete-slider-photo';
    }

}
