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
        $("#cardTitle").innerHTML += `<span style="font-weight: bold; color:teal">${user[0].pseudo}</span>`
        console.log(user[0])
    }
}

window.homeController = new HomeController()