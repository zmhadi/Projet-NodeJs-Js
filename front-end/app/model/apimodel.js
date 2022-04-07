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

    async getImage(imageId) {
        try {
            const image = await this.api.getImage(imageId)
            return image.url
        } catch {
            return undefined
        }
    }

    async searchBreeds(filter) {
        try {
            return await this.api.searchBreeds(filter)
        } catch {
            return undefined
        }
    }

    async getBreed(breedId) {
        try {
            const breeds = await this.api.getBreed(breedId)
            return breeds[0]
        } catch {
            return undefined
        }
    }

}