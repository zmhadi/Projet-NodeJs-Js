class IndexController extends BaseController {
    constructor() {
        super()
        this.model = new Apimodel()
    }

    async connection() {
        console.log({mail: $("#labelMailLogin").value , password: $("#labelPasswordLogin").value})
        console.log(await this.model.connection({mail: $("#labelMailLogin").value , password: $("#labelPasswordLogin").value}))
        console.log('connection',this.model.getStatus())
        this.verify()
    }
    verify() {
        var forms = document.querySelectorAll('.needs-validation')
        // Loop over them and prevent submission
        console.log(forms)
        Array.prototype.slice.call(forms)
            .forEach(function (form) {
                form.addEventListener('submit', function (event) {
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }
                    form.classList.add('was-validated')
                }, false)
            })
    }
}

window.indexController = new IndexController()
