const db = require('../db')

/**
 * return all Users from the database
 */
const getAll = async function () {
    return db.select('*').from('Users')
}

/**
 * return one User with id from the database
 * @params {string} pseudo - pseudo of User
 */
const findUserByMail = async function (mail) {
    return db.select('*').from('Users').where({mail: mail})
}

/**
 * return one User with id from the database
 * @params {int} id - id of User
 */
/*const findWithId = async function (id) {
    return db.select('*').from('Users').where({id: id})
}*/

/**
 * add new User in database
 * @params {string} mail - mail of user
 * @params {string} pseudo - pseudo of user
 * @params {string} password - password of user
 */
const add = async function (firstName, lastName, birthDate, mail, pseudo, password) {
    await db.insert({firstName: firstName, lastName: lastName, birthDate: birthDate, mail: mail, pseudo: pseudo, password: password}).into('Users')
}

/**
 * delete User in the database
 * @params {int} id - id of User
 */
/*
const remove = async function (id) {
    await db.delete().from('Users').where({id: id})
}
*/
/**
 * update User in database
 * @params {int} id - id of User
 * @params {string} pseudo - name of user
 * @params {string} lastName - lastName of user
 * @params {string} password - password of user
 */
const update = async function (id, firstName, lastName, birthDate, mail, pseudo, password) {
    await db.from("Users").where({id: id}).update({firstName: firstName, lastName: lastName, birthDate: birthDate, mail: mail, pseudo: pseudo, password: password})
}

module.exports = {
    getAll,
    findUserByMail,
    add,
    //remove,
    update,
    //findWithId
}