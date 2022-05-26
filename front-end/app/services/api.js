class Api {
    constructor() {
        this.baseurl = "http://localhost:3000"
        this.status = 500
        this.token = localStorage.getItem("token")
        this.userMail = localStorage.getItem("mail")
        this.user= {}
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

    getUserMail(){
        return this.userMail;
    }

    connection(data) {
        return (async () => {
            try {
                const rawResponse = await fetch(`${this.baseurl}/login`, {
                    method: 'POST',
                    headers: this.myHeaders,
                    body: JSON.stringify({mail: data.mail, password: data.password})
                });
                this.status = rawResponse.status || 'undefined'
                const content = await rawResponse.json()
                if(content[0] != undefined) {
                    this.responseError = content[0].param
                }
                localStorage.setItem("token", 'Bearer '+content.token)
                localStorage.setItem("mail", data.mail)
            } catch (e) {
                console.log(e)
            }
        })();
    }
    deconnection() {
        localStorage.removeItem("token")
        localStorage.removeItem("mail")
    }

    register(data) {
        return (async () => {
            try {
                const rawResponse = await fetch(`${this.baseurl}/create`, {
                    method: 'POST',
                    headers: this.myHeaders,
                    body: JSON.stringify({pseudo: data.pseudo,mail: data.mail, password: data.password})
                });
                this.status = rawResponse.status || 'undefined'
                const content = await rawResponse.json()
                if(await content != undefined) {
                    this.responseError = content[0].param
                    console.log(content)
                }
                this.status = rawResponse.status || 'undefined'
            } catch (e) {
                console.log(e)
            }
        })();
    }

    getUser(mail){
        return (async () => {
            try {
                const rawResponse = await fetch(`${this.baseurl}/users/${mail}`, {
                    method: 'GET',
                    headers: this.myHeaders,
                });
                return await rawResponse.json()
            } catch (e) {
                console.log(e)
            }
        })();
    }

    editUser(mail, data){
        return (async () => {
            try {
                const rawResponse = await fetch(`${this.baseurl}/users/${mail}`, {
                    method: 'PUT',
                    headers: this.myHeaders,
                    body: JSON.stringify({pseudo: data.pseudo,mail: data.mail, password: data.password})
                });
                this.status = rawResponse.status
            } catch (e) {
                console.log(e)
            }
        })();
    }
}