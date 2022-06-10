class Api {
    constructor() {
        this.baseurl = "http://localhost:3000"
        this.status = 500
        this.token = localStorage.getItem("token")
        this.myHeaders = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': this.token,
        })
        this.responseError = "";
    }

    getStatus() {
        return this.status
    }

    getResponseError() {
        return this.responseError
    }

    connection(data) {
        return (async() => {
            try {
                const rawResponse = await fetch(`${this.baseurl}/login`, {
                    method: 'POST',
                    headers: this.myHeaders,
                    body: JSON.stringify({
                        mail: data.mail,
                        password: data.password
                    })
                });
                this.status = rawResponse.status || 'undefined'
                const content = await rawResponse.json()
                if (content[0] != undefined) {
                    this.responseError = content[0].param
                }
                localStorage.setItem("token", 'Bearer ' + content.token)
            } catch (e) {
                console.log(e)
            }
        })();
    }

    deconnection() {
        localStorage.clear()
    }

    register(data) {
        return (async() => {
            try {
                const rawResponse = await fetch(`${this.baseurl}/create`, {
                    method: 'POST',
                    headers: this.myHeaders,
                    body: JSON.stringify({
                        pseudo: data.pseudo,
                        mail: data.mail,
                        password: data.password
                    })
                });
                this.status = rawResponse.status || 'undefined'
                const content = await rawResponse.json()
                if (await content != undefined) {
                    this.responseError = content[0].param
                    console.log(content)
                }
                this.status = rawResponse.status || 'undefined'
            } catch (e) {
                console.log(e)
            }
        })();
    }

    getUser(mail) {
        return (async() => {
            try {
                const rawResponse = await fetch(`${this.baseurl}/users/userInfo`, {
                    method: 'GET',
                    headers: this.myHeaders,
                });
                return await rawResponse.json()
            } catch (e) {
                console.log(e)
            }
        })();
    }

    editUser(mail, data) {
        return (async() => {
            try {
                const rawResponse = await fetch(`${this.baseurl}/users/updateUser`, {
                    method: 'PUT',
                    headers: this.myHeaders,
                    body: JSON.stringify({
                        pseudo: data.pseudo,
                        mail: data.mail,
                        password: data.password
                    })
                });
                this.status = rawResponse.status
            } catch (e) {
                console.log(e)
            }
        })();
    }

    getOldGuest(mail) {
        return (async() => {
            try {
                const rawResponse = await fetch(`${this.baseurl}/users/oldGuest`, {
                    method: 'GET',
                    headers: this.myHeaders,
                });
                return await rawResponse.json()
            } catch (e) {
                console.log(e)
            }
        })();
    }

    getNewGuest(mail) {
        return (async() => {
            try {
                const rawResponse = await fetch(`${this.baseurl}/users/newGuest`, {
                    method: 'GET',
                    headers: this.myHeaders,
                });
                return await rawResponse.json()
            } catch (e) {
                console.log(e)
            }
        })();
    }

    addGuest(data) {
        return (async() => {
            try {
                const rawResponse = await fetch(`${this.baseurl}/users/newGuest`, {
                    method: 'POST',
                    headers: this.myHeaders,
                    body: JSON.stringify({
                        sexe: data.sexe,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        birthDate: data.birthDate,
                        hasShare: data.hasShare
                    })
                });
                await rawResponse.json()
                this.status = rawResponse.status || 'undefined'
            } catch {}
        })();
    }

    deleteGuest(id) {
        return (async() => {
            try {
                const rawResponse = await fetch(`${this.baseurl}/users/guest/${id}`, {
                    method: 'DELETE',
                    headers: this.myHeaders,
                });
                await rawResponse.json()
                this.status = rawResponse.status || 'undefined'
            } catch {}
        })();
    }

    getInfoGuest(id) {
        return (async() => {
            try {
                const rawResponse = await fetch(`${this.baseurl}/users/guest/${id}`, {
                    method: 'GET',
                    headers: this.myHeaders,
                });
                this.status = rawResponse.status || 'undefined'
                return await rawResponse.json()
            } catch {}
        })();
    }

    getGuestHistory(id) {
        return (async() => {
            try {
                const rawResponse = await fetch(`${this.baseurl}/users/guest/history/${id}`, {
                    method: 'GET',
                    headers: this.myHeaders,
                });
                this.status = rawResponse.status || 'undefined'
                return await rawResponse.json()
            } catch {}
        })();
    }

    updateGuest(id, data) {
        return (async() => {
            try {
                const rawResponse = await fetch(`${this.baseurl}/users/updateGuest/${id}`, {
                    method: 'PUT',
                    headers: this.myHeaders,
                    body: JSON.stringify({
                        score: data.score,
                        note: data.note,
                        hasShare: data.hasShare
                    })
                });
                this.status = rawResponse.status || 'undefined'
                return await rawResponse.json()
            } catch {}
        })();
    }
}