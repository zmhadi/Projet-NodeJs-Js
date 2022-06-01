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

    async addGuest(data) {
        try {
            return await this.api.addGuest(data)
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

    getUser() {
        try {
            return this.api.getUser()
        }
        catch {
            return undefined
        }
    }

    getOldGuest() {
        try {
            return this.api.getOldGuest()
        }
        catch {
            return undefined
        }
    }

    getNewGuest() {
        try {
            return this.api.getNewGuest()
        }
        catch {
            return undefined
        }
    }
}