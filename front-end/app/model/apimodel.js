class Apimodel {
    constructor() {
        this.api = new Api()
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

}