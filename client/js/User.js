export const userTypes = {
    GUEST: "guest",
    USER: "user"
}

export class User {
    constructor(id, type) {
        this.id = id || null;
        this.type = type;
    }
}