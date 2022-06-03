class HomeController extends BaseController {
    constructor() {
        super();
        this.model = new Apimodel();
        this.load().then();
    }

    deconnection() {
        navigate("index");
        this.model.deconnection();
    }

    async load() {
        const user = await this.model.getUser();
        await this.historyMeet();
        $("#labelPseudoEdit").placeholder = user[0].pseudo;
        $("#labelMailEdit").placeholder = user[0].mail;
        $("#labelPasswordEdit").placeholder = "**********";
        $("#cardTitle").innerHTML = `Bonjour <span style="font-weight: bold; color:teal; text-transform: capitalize;">${user[0].pseudo}</span>`;
    }

    async edit() {
        $("#labelPseudoEdit").removeAttribute("readonly");
        $("#labelMailEdit").removeAttribute("readonly");
        $("#labelPasswordEdit").removeAttribute("readonly");
        $("#buttonEdit").innerText = "Appliquer changement(s)";
        $("#buttonEdit").setAttribute('onclick', 'homeController.apply()');
        $("#buttonEdit").style.borderColor = "teal";
        $("#buttonEdit").style.backgroundColor = "teal";
    }

    async apply() {
        await this.model.editUser(this.model.getUser().mail, {
            pseudo: $("#labelPseudoEdit").value || $("#labelPseudoEdit").placeholder,
            mail: $("#labelMailEdit").value || $("#labelMailEdit").placeholder,
            password: $("#labelPasswordEdit").value || $("#labelPasswordEdit").placeholder
        });
        console.log('edit user', this.model.getStatus());

        $("#labelPseudoEdit").setAttribute("readonly", "");
        $("#labelMailEdit").setAttribute("readonly", "");
        $("#labelPasswordEdit").setAttribute("readonly", "");
        $("#buttonEdit").style.borderColor = "grey";
        $("#buttonEdit").style.backgroundColor = "grey";
        $("#buttonEdit").innerText = "Editer mon compte";
        $("#buttonEdit").setAttribute('onclick', 'homeController.edit()');
        $("#closeModalEdit").click();
        await this.load();
    }

    async getAge(date) {
        var diff = Date.now() - date.getTime();
        var age = new Date(diff);
        return Math.abs(age.getUTCFullYear() - 1970);
    }

    async historyMeet() {
        $('#knowUser').innerHTML = '';
        $('#unknowUser').innerHTML = '';
        const oldGuest = await this.model.getOldGuest();
        const newGuest = await this.model.getNewGuest();

        if (oldGuest.length == 0) {
            $('#knowUser').innerHTML = `<div style="color: grey; text-align: center; font-size: 11px;">Aucune rencontre.</div>`;
        }

        if (newGuest.length == 0) {
            $('#unknowUser').innerHTML = `<div style="color: grey; text-align: center; font-size: 11px;">Aucune rencontre.</div>`;
        }

        for (let i = oldGuest.length - 1; i >= 0; i--) {
            if (i >= oldGuest.length - 2) {
                if (i == 0) {
                    $('#knowUser').innerHTML += `<div>
                                                            <span style="color: teal; font-weight: bold; text-transform: capitalize; padding-top: 10px">
                                                                ${oldGuest[i].sexe} <span style="text-transform: capitalize;">${oldGuest[i].firstName} </span><span style="text-transform: uppercase;">${oldGuest[i].lastName}</span></span>
                                                                <span style="color: grey !important; font-size: 11px; font-weight: initial !important;">
                                                                    , ${await this.getAge(new Date(oldGuest[i].birthDate))} ans
                                                                </span>
                                                                <span style="position:absolute;right: 0;padding-right: 25px;">${oldGuest[i].score}<span style="color:grey; font-weight: initial;">/10</span></span>
                                                                <div class="dropdown">
                                                                  <button class="btn btn-secondary dropdown-toggle" style="position: absolute; right: 0; background-color: inherit; color: teal; box-shadow: initial; -webkit-box-shadow: initial" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"></button>
                                                                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                                    <li><a class="dropdown-item" 
                                                                           data-bs-toggle="modal"  
                                                                           data-bs-target="#modalEditGuest" 
                                                                           onclick="homeController.loadGuestInfoEdit(${oldGuest[i].id})"
                                                                         >
                                                                         Modifier
                                                                    </a></li>
                                                                    <li><a class="dropdown-item" 
                                                                           data-bs-toggle="modal" 
                                                                           data-bs-target="#modalDeleteConfirm" 
                                                                           onclick="homeController.confirmDeleteGuest(${oldGuest[i].id})"
                                                                        >
                                                                        Supprimer
                                                                    </a></li>
                                                                  </ul>
                                                                </div>
                                                            </span>
                                                            <div style="font-style: italic;">" ${oldGuest[i].note} "</div>
                                                            <div style="color: grey; font-size: 11px">Le ${oldGuest[i].meetDate}</div>
                                                        </div>`;
                } else {
                    $('#knowUser').innerHTML += `<div style="border-bottom: 1px solid lightgrey; padding-bottom: 10px; padding-top: 10px;">
                                                            <span style="color: teal; font-weight: bold; text-transform: capitalize; padding-top: 10px">
                                                                ${oldGuest[i].sexe} <span style="text-transform: capitalize">${oldGuest[i].firstName} </span><span style="text-transform: uppercase;">${oldGuest[i].lastName}</span></span>
                                                                <span style="color: grey !important; font-size: 11px; font-weight: initial !important;">
                                                                    , ${await this.getAge(new Date(oldGuest[i].birthDate))} ans
                                                                </span>
                                                                <span style="position:absolute;right: 0;padding-right: 25px;">${oldGuest[i].score}<span style="color:grey; font-weight: initial;">/10</span></span>
                                                                <div class="dropdown">
                                                                  <button class="btn btn-secondary dropdown-toggle" style="position: absolute; right: 0; background-color: inherit; color: teal; box-shadow: initial; -webkit-box-shadow: initial" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"></button>
                                                                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                                    <li><a class="dropdown-item" 
                                                                           data-bs-toggle="modal"  
                                                                           data-bs-target="#modalEditGuest" 
                                                                           onclick="homeController.loadGuestInfoEdit(${oldGuest[i].id})"
                                                                         >
                                                                         Modifier
                                                                    </a></li>
                                                                    <li><a class="dropdown-item" 
                                                                           data-bs-toggle="modal" 
                                                                           data-bs-target="#modalDeleteConfirm" 
                                                                           onclick="homeController.confirmDeleteGuest(${oldGuest[i].id})"
                                                                        >
                                                                        Supprimer
                                                                    </a></li>
                                                                  </ul>
                                                                </div>
                                                            </span>
                                                            <div style="font-style: italic;">" ${oldGuest[i].note} "</div>
                                                            <div style="color: grey; font-size: 11px">Le ${oldGuest[i].meetDate}</div>
                                                        </div>`;
                }
            }
        }
        if (oldGuest.length - 2 > 0) {
            $("#knowUser").innerHTML += `<div style="color: grey; font-size: 11px; font-weight: initial; padding-top: 10px;">
                                                        ${oldGuest.length-2} autre(s) rencontre(s) passée(s)
                                                      </div>`;
        }
        for (let i = newGuest.length - 1; i >= 0; i--) {
            if (i >= newGuest.length - 2) {
                if (i == 0) {
                    $('#unknowUser').innerHTML += `<div style="padding-top: 10px">
                                                            <div style="color: teal; font-weight: bold; text-transform: capitalize; width: auto;">
                                                                ${newGuest[i].sexe}<span style="text-transform: capitalize"> ${newGuest[i].firstName}</span><span style="text-transform: uppercase;">${newGuest[i].lastName}</span>
                                                                <span style="color: grey !important; font-size: 11px; font-weight: initial !important;">
                                                                    , ${await this.getAge(new Date(newGuest[i].birthDate))} ans
                                                                </span>
                                                            </div>
                                                          </div>`;
                } else {
                    $('#unknowUser').innerHTML += `<div style="border-bottom: 1px solid lightgrey; padding-bottom: 10px; padding-top: 10px;">
                                                            <div style="color: teal; font-weight: bold; text-transform: capitalize; width: auto;">
                                                                ${newGuest[i].sexe}<span style="text-transform: capitalize"> ${newGuest[i].firstName} </span><span style="text-transform: uppercase;">${newGuest[i].lastName}</span>
                                                                <span style="color: grey !important; font-size: 11px; font-weight: initial !important;">
                                                                    , ${await this.getAge(new Date(newGuest[i].birthDate))} ans
                                                                </span>
                                                            </div>
                                                          </div>`;
                }
            }
        }
        if (newGuest.length - 2 > 0) {
            $("#unknowUser").innerHTML += `<div style="color: grey; font-size: 11px; font-weight: initial; padding-top: 10px;">
                                                        ${newGuest.length-2} autre(s) rencontre(s) à rencontrée(s)
                                                  </div>`;
        }
    }

    confirmDeleteGuest(id) {
        $('#buttonConfirmDeleteGuest').setAttribute('onclick', `homeController.deleteGuest(${id})`);
    }

    async deleteGuest(id) {
        await this.model.deleteGuest(id);
        await this.load();
        $('#buttonCloseModalConfirmDelete').click();
    }

    async addGuest() {
        await this.model.addGuest({
            sexe: $('#selectSexe').value,
            firstName: $("#labelAddGuestFirstName").value,
            lastName: $("#labelAddGuestLastName").value,
            birthDate: $("#labelAddGuestBirthDate").value
        });

        $("#labelAddGuestFirstName").value = '';
        $("#labelAddGuestLastName").value = '';
        $("#labelAddGuestBirthDate").value = '';
        $("#closeModalAddGuest").click();
        await this.load();
    }

    async loadGuestInfoEdit(id) {
        const data = await this.model.getInfoGuest(id);
        $('#infoGuestEdit').innerHTML = `<label class="form-label">Informations</label>
                                                <label class="form-label">Prénom</label>
                                                <input type="text" class="form-control" id="labelAddGuestFirstName" value=${data[0].firstName} readonly>
                                                <label class="form-label">Nom de famille</label>
                                                <input type="text" class="form-control" id="labelAddGuestLastName" value=${data[0].lastName} readonly>
                                                <label class="form-label">Date de naissance</label>
                                                <input type="date" class="form-control" value=${data[0].birthDate} readonly>`;
        $('#labelEditGuestNote').value = data[0].note;
        $('#labelEditGuestScore').options[data[0].score - 1].setAttribute('selected', '');
        $('#buttonEditGuest').setAttribute('onclick', `homeController.updateGuest(${data[0].id})`);
    }

    async updateGuest(id) {
        await this.model.updateGuest(id, {
            note: $('#labelEditGuestNote').value,
            score: $('#labelEditGuestScore').value
        });
        await this.load();
        $('#closeModalEditGuest').click();
    }
}

window.homeController = new HomeController();