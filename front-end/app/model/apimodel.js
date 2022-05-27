class Apimodel {
    constructor() {
        this.api = new Api()
    }

    deconnection() {
        this.api.deconnection()
    }

    async connection(data) {
        try {
            return await this.api.connection(data)
        } catch {
            return undefined
        }
    }

    async register(data) {
        try {
            return await this.api.register(data)
        }
        catch {
            return undefined
        }
    }

    async editUser(mail, data) {
        try {
            return await this.api.editUser(mail, data)
        }
        catch {
            return undefined
        }
    }

    getStatus() {
        try {
            return this.api.getStatus()
        } catch {
            return undefined
        }
    }

    getResponseError() {
        try {
            return this.api.getResponseError()
        }
        catch {
            return undefined
        }
    }

    getUserMail() {
        try {
            return this.api.getUserMail()
        }
        catch {
            return undefined
        }
    }

    getUser(mail) {
        try {
            return this.api.getUser(mail)
        }
        catch {
            return undefined
        }
    }

    getOldGuest(mail) {
        try {
            return this.api.getOldGuest(mail)
        }
        catch {
            return undefined
        }
    }

    getNewGuest(mail) {
        try {
            return this.api.getNewGuest(mail)
        }
        catch {
            return undefined
        }
    }
}