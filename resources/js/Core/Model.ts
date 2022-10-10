export class Model {
    static slug = '';
    public static index() {
        return this.slug;
    }
    public static create() {
        return this.slug + '/create';
    }
    public static store() {
        return this.slug;
    }
    public static edit(id: number) {
        return this.slug + `/${id}` + '/edit';
    }
    public static update(id: number) {
        return this.slug + `/${id}`;
    }
    public static show(id: number) {
        return this.slug + `/${id}`;
    }
    public static delete(id: number) {
        return this.slug + `/${id}`;
    }
}

// create
// store

// edit
// update

// index
// show
// delete
