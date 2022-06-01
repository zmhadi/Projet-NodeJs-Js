class HomeController extends BaseController {
    constructor() {
        super()
        this.model = new Apimodel()
        this.load().then()
    }

    deconnection() {
        navigate("index")
        this.model.deconnection()
    }

    async load() {
        const user = await this.model.getUser(this.model.getUserMail())
        await this.historyMeet()
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
        await this.model.editUser(this.model.getUserMail(), {
            pseudo: $("#labelPseudoEdit").value || $("#labelPseudoEdit").placeholder,
            mail: $("#labelMailEdit").value || $("#labelMailEdit").placeholder,
            password: $("#labelPasswordEdit").value || $("#labelPasswordEdit").placeholder
        })
        console.log('edit user', this.model.getStatus())

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

    async historyMeet() {
        async function getAge(date) {
            var diff = Date.now() - date.getTime();
            var age = new Date(diff);
            return Math.abs(age.getUTCFullYear() - 1970);
        }

        $('#knowUser').innerHTML = ''
        $('#unknowUser').innerHTML = ''
        const oldGuest = await this.model.getOldGuest(this.model.getUserMail())
        const newGuest = await this.model.getNewGuest(this.model.getUserMail())
        for(let i = oldGuest.length-1; i>=0; i--) {
            if(i >= oldGuest.length-2) {
                if (i == 0) {
                    $('#knowUser').innerHTML += `<div>
                                                            <div style="color: teal; font-weight: bold;">
                                                                ${oldGuest[i].firstName} ${oldGuest[i].lastName}
                                                                <span style="color: grey !important; font-size: 11px; font-weight: initial !important;">
                                                                    , ${await getAge(new Date(oldGuest[i].birthDate))} ans
                                                                </span>
                                                                <span style="position:absolute;right: 0;padding-right: 25px;">${oldGuest[i].score}<span style="color:grey; font-weight: initial;">/10</span></span>
                                                            </div>
                                                            <div style="font-style: italic;">" ${oldGuest[i].note} "</div>
                                                            <div style="color: grey; font-size: 11px">Le ${oldGuest[i].meetDate}</div>
                                                        </div>`
                } else {
                    $('#knowUser').innerHTML += `<div style="border-bottom: 1px solid lightgrey; padding-bottom: 10px; padding-top: 7px;">
                                                            <div style="color: teal; font-weight: bold;">
                                                                ${oldGuest[i].firstName} ${oldGuest[i].lastName} 
                                                                <span style="color: grey !important; font-size: 11px; font-weight: initial !important;">
                                                                    , ${await getAge(new Date(oldGuest[i].birthDate))} ans
                                                                </span>
                                                                <span style="position:absolute;right: 0;padding-right: 25px;">${oldGuest[i].score}<span style="color:grey; font-weight: initial;">/10</span></span>
                                                                <div class="dropdown">
                                                                  <button class="btn btn-secondary dropdown-toggle" style="position: absolute; right: 0; background-color: inherit; color: teal; box-shadow: initial; -webkit-box-shadow: initial" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"></button>
                                                                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                                    <li><a class="dropdown-item" href="#">Modifier</a></li>
                                                                    <li><a class="dropdown-item" href="#">Supprimer</a></li>
                                                                  </ul>
                                                                </div>
                                                            </div>
                                                            <div style="font-style: italic;">" ${oldGuest[i].note} "</div>
                                                            <div style="color: grey; font-size: 11px">Le ${oldGuest[i].meetDate}</div>
                                                        </div>`
                }
            }
        }
        if(oldGuest.length-2 > 0) {
            $("#knowUser").innerHTML += `<div style="color: grey; font-size: 11px; font-weight: initial; padding-top: 10px;">
                                                        ${oldGuest.length-2} autre(s) rencontre(s) passée(s)
                                                      </div>`
        }
        for(let i = newGuest.length-1; i>=0; i--) {
            if(i >= newGuest.length-2) {
                if(i == 0) {
                    $('#unknowUser').innerHTML += `<div>
                                                        <div style="color: teal; font-weight: bold;">
                                                            ${newGuest[i].firstName} ${newGuest[i].lastName}
                                                            <span style="color: grey !important; font-size: 11px; font-weight: initial !important;">
                                                                , ${await getAge(new Date(newGuest[i].birthDate))} ans
                                                            </span>
                                                        </div>
                                                    </div>`
                }
                else {
                    $('#unknowUser').innerHTML += `<div style="border-bottom: 1px solid lightgrey; padding-bottom: 10px; padding-top: 7px;">
                                                        <div style="color: teal; font-weight: bold;">
                                                            ${newGuest[i].firstName} ${newGuest[i].lastName}
                                                            <span style="color: grey !important; font-size: 11px; font-weight: initial !important;">
                                                                , ${await getAge(new Date(newGuest[i].birthDate))} ans
                                                            </span>
                                                        </div>
                                                    </div>`
                }
            }
        }
        if(newGuest.length-2 > 0) {
            $("#unknowUser").innerHTML += `<div style="color: grey; font-size: 11px; font-weight: initial; padding-top: 10px;">
                                                        ${newGuest.length-2} autre(s) rencontre(s) suggérée(s)
                                                      </div>`
        }
    }
}

window.homeController = new HomeController()