class IndexController extends BaseController {
    constructor() {
        super()
        this.model = new Apimodel()
        this.userMail = ""
    }

    async connection() {
        //console.log({mail: $("#labelMailLogin").value , password: $("#labelPasswordLogin").value})
        await this.model.connection({mail: $("#labelMailLogin").value , password: $("#labelPasswordLogin").value})
        console.log('connection',this.model.getStatus())
        this.userMail = $("#labelMailLogin").value
        //console.log(this.userMail, 'mail')
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

    async verifyModal() {

        $("#labelPseudoRegister").style.borderBottomColor="grey"
        $("#labelPasswordRegister").style.borderBottomColor="grey"
        $("#labelMailRegister").style.borderBottomColor="grey"
        $("#mailRegister").innerHTML=`<label id="mailRegister" for="labelMailRegister" class="form-label">Email</label>`

        if(this.model.getStatus() == 409){
            $("#mailRegister").innerHTML+=`<p style="color: red">Email already exist !</p>`
        }

        let message = this.model.getResponseError()
        if(message == "pseudo") {
            $("#labelPseudoRegister").style.borderBottomColor="red"
        }
        else if(message == "mail" || this.model.getStatus() == 409) {
            $("#labelMailRegister").style.borderBottomColor="red"
        }
        else if(message == "password") {
            $("#labelPasswordRegister").style.borderBottomColor="red"
        }
    }

    async register() {
        const req = {
            pseudo: $("#labelPseudoRegister").value,
            mail: $("#labelMailRegister").value,
            password: $("#labelPasswordRegister").value
        }
        await this.model.register(req)
        await this.verifyModal()
        console.log('status', this.model.getStatus())

        if(this.model.getStatus() == 200){
            $("#closeModal").click()
            navigate("home")
        }
    }
}

window.indexController = new IndexController()
