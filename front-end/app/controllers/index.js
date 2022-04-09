class IndexController extends BaseController {
    constructor() {
        super()
        this.model = new Apimodel()
        this.userMail = ""
    }

    async connection() {
        console.log({mail: $("#labelMailLogin").value , password: $("#labelPasswordLogin").value})
        console.log(await this.model.connection({mail: $("#labelMailLogin").value , password: $("#labelPasswordLogin").value}))
        console.log('connection',this.model.getStatus())
        this.userMail = $("#labelMailLogin").value
        console.log(this.userMail, 'mail')
        await this.verify()
        if(this.model.getStatus() == 200){
            navigate("home")
        }
    }

    async verify() {
        let message = this.model.getResponseError()
        console.log(message)
        if(message == "password") {
            $("#toastMessage").innerText="Must define password"
            this.toast("toastLogin")
        }
        if(message == "mail") {
            $("#toastMessage").innerText="Must define email"
            this.toast("toastLogin")
        }
        if(this.model.getStatus() == 401) {
            $("#toastMessage").innerText="Login failed"
            this.toast("toastLogin")
        }
    }

    async register() {
        const req = {
            pseudo: $("#labelPseudoRegister").value,
            mail: $("#labelMailRegister").value,
            password: $("#labelPasswordRegister").value
        }
        console.log(req)
        console.log(await this.model.register(req))
    }
}

window.indexController = new IndexController()
