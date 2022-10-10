
export type EventImagesDB = {
    id: number,
    event_name: string,
    event_images: string,
}

export class EventImages   {
    public id: number;
    public eventName: string;
    private _eventImages: string;
    static slug = '/event-images';
    constructor(event: EventImagesDB) {
        this.id = event.id;
        this.eventName = event.event_name;
        this._eventImages = event.event_images;
    }
    public get eventImages() {
        const images = JSON.parse(this._eventImages) as string[]
        return images.map(
            image => ({path:'/storage/images/' + image,name:image})
        )
    }
    // routes
    static store(){
        return this.slug + '/store';
    }

    static update(id:number){
        return this.slug + `/update/${id}`;
    }
    static deleteImageFromEvent(id:number){
        return this.slug + `/delete-image-from-event/${id}`;
    }
    static delete(id:number){
        return this.slug + `/${id}`;
    }
}
