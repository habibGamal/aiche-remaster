import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Model } from "../Core/Model";
export type CommitteDB = {
    id: number,
    name: string,
    icon: string,
    description: string,
}

export class Committe extends Model {
    public id: number;
    public name: string;
    public icon: IconProp;
    private _description: string;
    static slug = '/committes';
    constructor(committe: CommitteDB) {
        super();
        this.id = committe.id;
        this.name = committe.name;
        this.icon = committe.icon as IconProp;
        this._description = committe.description;
    }
    public get rawDescription() {
        return this._description;
    }
    public get description() {
        const desc = this._description.split('.');
        const lastSentence = desc[desc.length - 1];
        if (lastSentence == '' || lastSentence == ' ') {
            desc.pop()
        }
        return desc;
    }
}
