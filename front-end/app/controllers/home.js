class HomeController extends BaseController {
    constructor() {
        super()
        this.model = new Apimodel()
        this.load()
    }

    async load() {
        console.log("je suis la")
    }
}

window.homeController = new HomeController()