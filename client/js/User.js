export const userTypes = {
    GUEST: "guest",
    USER: "user"
}

export class User {
    constructor(id, username, type) {
        this.id = id;
        this.username = username || null;
        this.type = type;
    }
}