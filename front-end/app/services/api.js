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
        return (async () => {
            try {
                const rawResponse = await fetch(`${this.baseurl}/login`, {
                    method: 'POST',
                    headers: this.myHeaders,
                    body: JSON.stringify({mail: data.mail, password: data.password})
                });
                this.status = rawResponse.status || 'undefined'
                const content = await rawResponse.json()
                if(content != undefined) {
                    this.responseError = content[0].param
                    console.log(content)
                }
                localStorage.setItem("token", content.token)
            } catch (e) {
                console.log(e)
            }
        })();
    }
}