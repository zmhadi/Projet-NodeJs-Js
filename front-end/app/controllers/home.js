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
        $("#cardTitle").innerHTML = `Bonjour <span style="font-weight: bold; color:teal; text-transform: capitalize;">${user[0].pseudo}</span>`
    }

    async edit() {
        $("#labelPseudoEdit").removeAttribute("disabled")
        $("#labelMailEdit").removeAttribute("disabled")
        $("#labelPasswordEdit").removeAttribute("disabled")
        $("#buttonEdit").innerText="Appliquer changement(s)"
        $("#buttonEdit").setAttribute('onclick','homeController.apply()')
        $("#buttonEdit").style.borderColor="teal"
        $("#buttonEdit").style.backgroundColor="teal"
    }

    async apply() {
        this.model.editUser(this.model.getUserMail(), {pseudo : $("#labelPseudoEdit").value || $("#labelPseudoEdit").placeholder,
                                                            mail: $("#labelMailEdit").value || $("#labelMailEdit").placeholder,
                                                            password: $("#labelPasswordEdit").value || $("#labelPasswordEdit").placeholder})
        $("#labelPseudoEdit").setAttribute("disabled", "")
        $("#labelMailEdit").setAttribute("disabled", "")
        $("#labelPasswordEdit").setAttribute("disabled", "")
        $("#buttonEdit").style.borderColor="grey"
        $("#buttonEdit").style.backgroundColor="grey"
        $("#buttonEdit").innerText="Editer mon compte"
        $("#buttonEdit").setAttribute('onclick','homeController.edit()')
        $("#closeModalEdit").click()
        await this.load()
    }
}

window.homeController = new HomeController()