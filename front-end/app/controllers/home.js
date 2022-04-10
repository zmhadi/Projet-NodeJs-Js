class HomeController extends BaseController {
    constructor() {
        super()
        this.model = new Apimodel()
        this.load()
    }

    async load() {
        const user = await this.model.getUser(this.model.getUserMail())
        $("#labelPseudoEdit").placeholder= user[0].pseudo
        $("#labelMailEdit").placeholder= user[0].mail
        $("#labelPasswordEdit").placeholder= "**********"
        $("#cardTitle").innerHTML = `Bonjour <span style="font-weight: bold; color:teal">${user[0].pseudo}</span>`
        console.log(user[0])
    }

    async edit() {
        $("#labelPseudoEdit").removeAttribute("disabled")
        $("#labelMailEdit").removeAttribute("disabled")
        $("#labelPasswordEdit").removeAttribute("disabled")
        $("#buttonEdit").innerText="Apply"
        $("#buttonEdit").setAttribute('onclick','homeController.apply()')
    }

    async apply() {
        console.log('hehe')
        console.log(this.model.editUser(this.model.getUserMail(), {pseudo : $("#labelPseudoEdit").value,
                                                                        mail: $("#labelMailEdit").value,
                                                                        password: $("#labelPasswordEdit").value}))
        $("#labelPseudoEdit").setAttribute("disabled", "")
        $("#labelMailEdit").setAttribute("disabled", "")
        $("#labelPasswordEdit").setAttribute("disabled", "")
        $("#buttonEdit").innerText="Edit profil"
        $("#buttonEdit").setAttribute('onclick','homeController.edit()')
        await this.load()
    }
}

window.homeController = new HomeController()