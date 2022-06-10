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
                if (i == 0) {
                    $('#knowUser').innerHTML += `<div>
                                                            <span style="color: teal; font-weight: bold; text-transform: capitalize; padding-top: 10px">
                                                                ${oldGuest[i].sexe} <span style="text-transform: capitalize;">${oldGuest[i].firstName} </span><span style="text-transform: uppercase;">${oldGuest[i].lastName}</span></span>
                                                                <span style="color: grey !important; font-size: 11px; font-weight: initial !important;">
                                                                    , ${await this.getAge(new Date(oldGuest[i].birthDate))} ans
                                                                </span>
                                                                <div class="dropdown">
                                                                  <button class="btn btn-secondary dropdown-toggle" style="position: absolute; right: 0; background-color: inherit; color: teal; box-shadow: initial; -webkit-box-shadow: initial" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"></button>
                                                                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                                    <li><a class="dropdown-item" 
                                                                           data-bs-toggle="modal" 
                                                                           data-bs-target="#modalHistoryGuest" 
                                                                           onclick="homeController.loadGuestHistory(${oldGuest[i].id})"
                                                                        >
                                                                        Voir
                                                                    </a></li>
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
                                                            <div style="font-style: italic; margin-right: 40px;">" ${oldGuest[i].note} "</div>
                                                            <div style="color: grey; font-size: 11px">Le ${oldGuest[i].meetDate}</div>
                                                        </div>`;
                } else {
                    $('#knowUser').innerHTML += `<div style="border-bottom: 1px solid lightgrey; padding-bottom: 10px; padding-top: 10px;">
                                                            <span style="color: teal; font-weight: bold; text-transform: capitalize; padding-top: 10px">
                                                                ${oldGuest[i].sexe} <span style="text-transform: capitalize">${oldGuest[i].firstName} </span><span style="text-transform: uppercase;">${oldGuest[i].lastName}</span></span>
                                                                <span style="color: grey !important; font-size: 11px; font-weight: initial !important;">
                                                                    , ${await this.getAge(new Date(oldGuest[i].birthDate))} ans
                                                                </span>
                                                                <div class="dropdown">
                                                                  <button class="btn btn-secondary dropdown-toggle" style="position: absolute; right: 0; background-color: inherit; color: teal; box-shadow: initial; -webkit-box-shadow: initial" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"></button>
                                                                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                                    <li><a class="dropdown-item" 
                                                                           data-bs-toggle="modal" 
                                                                           data-bs-target="#modalHistoryGuest" 
                                                                           onclick="homeController.loadGuestHistory(${oldGuest[i].id})"
                                                                        >
                                                                        Voir
                                                                    </a></li>
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
                                                            <div style="font-style: italic; margin-right: 40px">" ${oldGuest[i].note} "</div>
                                                            <div style="color: grey; font-size: 11px">Le ${oldGuest[i].meetDate}</div>
                                                        </div>`;
                }

        }
        for (let i = newGuest.length - 1; i >= 0; i--) {
            if (i >= newGuest.length - 2) {
                if (i == 0) {
                    $('#unknowUser').innerHTML += `<div style="padding-top: 10px">
                                                            <div style="color: teal; font-weight: bold; text-transform: capitalize; width: auto;">
                                                                ${newGuest[i].sexe}<span style="text-transform: capitalize"> ${newGuest[i].firstName}</span><span style="text-transform: uppercase;"> ${newGuest[i].lastName}</span>
                                                                <span style="color: grey !important; font-size: 11px; font-weight: initial !important;">
                                                                    , ${await this.getAge(new Date(newGuest[i].birthDate))} ans
                                                                </span>
                                                                <button class="btn btn-primary" 
                                                                        style="height: 20px; width: 20px; position:absolute; right: 0; text-align: center; margin-right: 20px; vertical-align: middle"
                                                                        data-bs-toggle="modal"  
                                                                        data-bs-target="#modalConfirmMeet"
                                                                        onclick="homeController.meet(${newGuest[i].id})"></button>
                                                            </div>
                                                          </div>`;
                } else {
                    $('#unknowUser').innerHTML += `<div style="border-bottom: 1px solid lightgrey; padding-bottom: 10px; padding-top: 10px;">
                                                            <div style="color: teal; font-weight: bold; text-transform: capitalize; width: auto;">
                                                                ${newGuest[i].sexe}<span style="text-transform: capitalize"> ${newGuest[i].firstName} </span><span style="text-transform: uppercase;">${newGuest[i].lastName}</span>
                                                                <span style="color: grey !important; font-size: 11px; font-weight: initial !important;">
                                                                    , ${await this.getAge(new Date(newGuest[i].birthDate))} ans
                                                                </span>
                                                                <button class="btn btn-primary" 
                                                                        style="height: 20px; width: 20px; position:absolute; right: 0; text-align: center; margin-right: 20px; vertical-align: middle"
                                                                        data-bs-toggle="modal"  
                                                                        data-bs-target="#modalConfirmMeet"
                                                                        onclick="homeController.meet(${newGuest[i].id})"></button>                                                            </div>
                                                          </div>`;
                }
            }
        }
        if (newGuest.length - 2 > 0) {
            $("#unknowUser").innerHTML += `<div style="color: grey; font-size: 11px; font-weight: initial; padding-top: 10px;">
                                                        ${newGuest.length-2} autre(s) personne(s) à rencontrée(s)
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
            firstName: $("#labelAddGuestFirstName").value.toLowerCase(),
            lastName: $("#labelAddGuestLastName").value.toLowerCase(),
            birthDate: $("#labelAddGuestBirthDate").value
        });

        $("#labelAddGuestFirstName").value = '';
        $("#labelAddGuestLastName").value = '';
        $("#labelAddGuestBirthDate").value = '';
        $("#closeModalAddGuest").click();
        await this.load();
    }

    async loadGuestInfoEdit(id) {
        $('#labelEditGuestShare').options[0].removeAttribute('selected');
        $('#labelEditGuestShare').options[1].removeAttribute('selected');
        const data = await this.model.getInfoGuest(id);
        $('#infoGuestEdit').innerHTML = `<div style="text-align: left">
                                                    <label class="form-label">Informations personnelles</label><p style="color:grey; font-size: 13px">
                                                    Civilité : <span style="text-transform: capitalize; color: teal">${data[0].sexe}</span><br>
                                                    Prénom : <span style="text-transform: capitalize; color: teal">${data[0].firstName}</span><br>
                                                    Nom de famille : <span style="text-transform: capitalize; color: teal">${data[0].lastName}</span><br>
                                                    Date de naissance : <span style="text-transform: capitalize; color: teal">${new Date(data[0].birthDate).toLocaleDateString()}</span><br>
                                                    Age : <span style="color: teal">${await this.getAge(new Date(data[0].birthDate))} ans</span><br>
                                                    </p>`;
        $('#labelEditGuestNote').value = data[0].note;
        $('#labelEditGuestScore').options[data[0].score - 1].setAttribute('selected', '');
        if(data[0].hasShare == 'true') $('#labelEditGuestShare').options[0].setAttribute('selected', '');
        else $('#labelEditGuestShare').options[1].setAttribute('selected', '');
        $('#buttonEditGuest').setAttribute('onclick', `homeController.updateGuest(${data[0].id})`);
    }

    async updateGuest(id) {
        await this.model.updateGuest(id, {
            note: $('#labelEditGuestNote').value,
            score: $('#labelEditGuestScore').value,
            hasShare: $('#labelEditGuestShare').value
        });
        await this.load();
        $('#closeModalEditGuest').click();
    }

    meet(id) {
        $('#buttonConfirmMeet').setAttribute('onclick', `homeController.meetGuest(${id})`);
    }

    async meetGuest(id) {
        await this.model.updateGuest(id, {
            note: $('#labelAddGuestNote').value,
            score: $('#labelAddGuestScore').value,
            hasShare: $('#labelAddGuestShare').value
        });
        await this.load();
        $('#labelAddGuestNote').value = ''
        $('#labelEditGuestScore').options[$('#labelAddGuestScore').value - 1].removeAttribute('selected');

        $('#buttonCloseModalConfirmMeet').click();
    }

    async loadGuestHistory(id) {
        $('#contentHistoryGuest').innerHTML = ''
        const guestHistory = await this.model.getGuestHistory(id)
        if (guestHistory.length == 0) {
            $('#contentHistoryGuest').innerHTML += `<div style="text-align: center; width: 100%">Aucune remarque n'a été partagée sur cette personne.</div>`
            return
        }
        if (guestHistory.length != 0) {
            $('#contentHistoryGuest').innerHTML += `<div style="text-align: left">
                                                    <label class="form-label">Informations personnelles</label><p style="color:grey; font-size: 13px">
                                                    Civilité : <span style="text-transform: capitalize; color: teal">${guestHistory[0].sexe}</span><br>
                                                    Prénom : <span style="text-transform: capitalize; color: teal">${guestHistory[0].firstName}</span><br>
                                                    Nom de famille : <span style="text-transform: capitalize; color: teal">${guestHistory[0].lastName}</span><br>
                                                    Date de naissance : <span style="text-transform: capitalize; color: teal">${new Date(guestHistory[0].birthDate).toLocaleDateString()}</span><br>
                                                    Age : <span style="color: teal">${await this.getAge(new Date(guestHistory[0].birthDate))} ans</span><br>
                                                    </p><label class="form-label">Retrouvez ci-dessous toutes les remarques données par d'autres utilisateurs :</label>`;
            for (let i = guestHistory.length - 1; i >= 0; i--) {
                if (i === 0) {
                    $('#contentHistoryGuest').innerHTML += `<div style="text-align: left">
                                                                    <span style="color: teal; font-weight: bold; text-transform: capitalize; padding-top: 10px">
                                                                        <span style="text-transform: capitalize;">${guestHistory[i].userPseudo}</span> ,
                                                                        <span style="position:absolute;right: 0;padding-right: 25px;">${guestHistory[i].score}<span style="color:grey; font-weight: initial;">/10</span></span>
                                                                    </span>
                                                                    <div style="font-style: italic; margin-right: 40px;">" ${guestHistory[i].note} "</div>
                                                                    <div style="color: grey; font-size: 11px">Le ${guestHistory[i].meetDate}</div>
                                                                </div>`;
                } else {
                    $('#contentHistoryGuest').innerHTML += `<div style="border-bottom: 1px solid lightgrey; padding-bottom: 10px; padding-top: 10px; text-align: left">
                                                                    <span style="color: teal; font-weight: bold; text-transform: capitalize; padding-top: 10px">
                                                                        <span style="text-transform: capitalize;">${guestHistory[i].userPseudo}</span> ,
                                                                        <span style="position:absolute;right: 0;padding-right: 25px;">${guestHistory[i].score}<span style="color:grey; font-weight: initial;">/10</span></span>
                                                                    </span>
                                                                    <div style="font-style: italic; margin-right: 40px">" ${guestHistory[i].note} "</div>
                                                                    <div style="color: grey; font-size: 11px">Le ${guestHistory[i].meetDate}</div>
                                                                </div>`;
                }
            }
        }
    }
}

window.homeController = new HomeController();