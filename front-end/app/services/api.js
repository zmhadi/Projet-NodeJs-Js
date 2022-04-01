class Api {
    constructor() {
        this.baseurl = "http://localhost:3000"
        this.status = 500
        this.token = localStorage.getItem("token")
        this.myHeaders = new Headers({
            'x-api-key': 'VOTRE CLE ICI',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': this.token,
        })
    }

    /*myFetch(url) {
        return new Promise(((resolve, reject) => {
            fetch(`${this.baseurl}/${url}`, {headers: this.myHeaders})
                .then(response => {
                    if (response.status === 200) {

                        resolve(response.json())
                    } else {
                        reject(response.status)
                    }
                })
                .catch(err => reject(err))
        }))
    }*/

    /*getImage(imageId) {
        return this.myFetch(`images/${imageId}`)
    }*/
    getStatus() {
        return this.status
    }

    connection(data) {
        return (async () => {
            try {
                const rawResponse = await fetch(`${this.baseurl}/login`, {
                    method: 'POST',
                    headers: this.myHeaders,
                    body: JSON.stringify({mail: data.mail, password: data.password})
                });
                console.log(rawResponse.status)
                this.status = rawResponse.status
                const content = await rawResponse.json()
                localStorage.setItem("token", content.token)
            }
            catch(e){
             console.log(e)
            }
        })();

        /*console.log('connection', data)
        return new Promise(( async(resolve, reject) => {
            console.log('resolve')
            console.log('body', JSON.stringify({mail: data.mail, password: data.password}))
            await fetch(`${this.baseurl}/login`, {headers: this.myHeaders, method: "POST",
                body: JSON.stringify({mail: data.mail, password: data.password}), mode: 'no-cors'},)
                .then(response => {
                    if (response.status === 200) {
                        console.log('response', response)
                        resolve(response.json())
                    } else {
                        reject(response.status)
                    }
                })
                .catch(err => reject(err)) }))*/

            /*(async () => {
                const rawResponse = await fetch(`${this.baseurl}/login`, {
                    method: 'POST',
                    headers: this.myHeaders,
                    body: JSON.stringify({mail: data.mail, password: data.password})
                });
                const content = await rawResponse.json();

                console.log(content);
            })();*/





        /*return new Promise(((resolve, reject) => {
            fetch(`${this.baseurl}/breeds/search?q=${filter}`, {headers: this.myHeaders})
                .then(response => {
                    if (response.status === 200) {
                        resolve(response.json())
                    } else {
                        reject(response.status)
                    }
                })
                .catch(err => reject(err))
        }))*/
    }

    /*getBreeds() {
        return this.myFetch(`breeds`)*/
        /*return new Promise(((resolve, reject) => {
            fetch(`${this.baseurl}/breeds`, {headers: this.myHeaders})
                .then(response => {
                    if (response.status === 200) {
                        resolve(response.json())
                    } else {
                        reject(response.status)
                    }
                })
                .catch(err => reject(err))
        }))*/
    }

    /*getBreed(breedId) {
        return this.myFetch(`images/search?breed_ids=${breedId}`)*/
        /*return new Promise(((resolve, reject) => {
            fetch(`${this.baseurl}/images/search?breed_ids=${breedId}`, {headers: this.myHeaders})
                .then(response => {
                    if (response.status === 200) {
                        resolve(response.json())
                    } else {
                        reject(response.status)
                    }
                })
                .catch(err => {
                    reject(err)
                })
        }))*/
    //}
//}