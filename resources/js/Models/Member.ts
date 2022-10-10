import { Model } from "../Core/Model";
export enum MemberIn {
    TEAM = 'team',
    HIGHBOARD = 'highboard',
    BOARD = 'board',
}
export type MemberDB = {
    id: number,
    name: string,
    position: string,
    facebook: string,
    linkedin: string,
    profile: string,
    in: 'team' | 'highboard' | 'board',
}

export class Member extends Model {
    public id: number;
    public name: string;
    public position: string;
    public facebook: string;
    public linkedin: string;
    private _profile: string;
    private _in: string;
    static slug = '/members';
    constructor(member: MemberDB) {
        super();
        this.id = member.id;
        this.name = member.name;
        this.position = member.position;
        this.facebook = member.facebook;
        this.linkedin = member.linkedin;
        this._profile = member.profile;
        this._in = member.in;
    }
    public get profile() {
        return '/storage/images/' + this._profile;
    }
    public get profileName() {
        return this._profile
    }
    public get absProfileURI() {
        return window.location.origin + '/storage/images/' + this._profile
    }
    public get in() {
        if (this._in === 'team')
            return MemberIn.TEAM;
        if (this._in === 'highboard')
            return MemberIn.HIGHBOARD;
        if (this._in === 'board')
            return MemberIn.BOARD;
    }
    static getTeam(members: Member[]) {
        return members.filter(member => member.in === MemberIn.TEAM);
    }
    static getHighBoard(members: Member[]) {
        return members.filter(member => member.in === MemberIn.HIGHBOARD);
    }
    static getBoard(members: Member[]) {
        return members.filter(member => member.in === MemberIn.BOARD);
    }
}
