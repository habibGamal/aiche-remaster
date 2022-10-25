import { IMAGES_PATH } from "../Config";

export type AppConfigDB = {
    id: number,
    name: string,
    value: any,
}

export interface SliderPhoto {
    name:string;
    link:string;
}

export class AppConfig {
    public id: number | null = null;
    public name: string | null = null;
    private _value: any;
    private static slug = '/app-config';
    constructor(appConfig: AppConfigDB | null) {
        if (appConfig !== null) {
            this.id = appConfig.id;
            this.name = appConfig.name;
            this._value = appConfig.value;
        }
    }
    public presidentName(): string | null {
        if (this.name == 'president_name') {
            return this._value;
        }
        return null;
    }
    public presidentPhoto() {
        if (this.name == 'president_photo') {
            return '/storage/images/' + this._value;
        }
        return null;
    }
    public vision() {
        if (this.name == 'vision') {
            return JSON.parse((this._value)) as { vision: string, vision_description: string };
        }
        return {
            vision: 'Vision',
            vision_description: 'Volunteerism can be divided into two parts: Volunteering Work itself and Volunteers. If we want to promote volunteerism, we should develop these two parts together. Volunteering work development can be achieved by finding the smartest, quickest and most a ccurate way to do the needed job. Volunteers’ development can be achieved by improving both technical knowledge and non-technical skills of the volunteers to be ready for after graduation life.'
        };
    }
    static defaultPresidentPhoto() {
        return IMAGES_PATH + 'president.jpg'
    }
    // routes
    static updateVision() {
        return this.slug + '/update-vision';
    }
    static updatePresidentPhoto() {
        return this.slug + '/update-president-photo';
    }
    static updatePresidentName() {
        return this.slug + '/update-president-name';
    }

}
