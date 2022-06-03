const db = require('../db')

/**
 * return one User from the database
 * @params {string} mail - mail of User to find
 */
const findUserByMail = async function (mail) {
    return await db.select('*').from('Users').where({mail: mail})
}

/**
 * return one User from the database
 * @params {int} id - id of User
 */
const findUserById = async function (id) {
    return await db.select('*').from('Users').where({id: id})
}

/**
 * return one Guest from the database
 * @params {int} id - id of guest
 */
 const findGuestById = async function (id) {
    return await db.select('*').from('Guests').where({id: id})
}

/**
 * return a list of meet for a guest from the database
 * @params {object} data - contain firstName, lastName and birthDate
 */
const findGuestByIdentity = async function(firstName, lastName, birthDate) {
    return await db.select('*').from('Guests').where({firstName: firstName, lastName: lastName, birthDate: birthDate})
}

/**
 * add new User in database
 * @params {string} mail - mail of user
 * @params {string} pseudo - pseudo of user
 * @params {string} password - password of user
 */
const addUser = async function ( mail, password, pseudo) {
    await db.insert({mail: mail, password: password, pseudo: pseudo}).into('Users')
}

/**
 * add new Guest in database
 * @params {int} id - id of user
 * @params {string} firstName - firstName of guest
 * @params {string} lastName - lastName of guest
 * @params {string} birthDate - birthDate of guest
 */
const addGuest = async function (id, sexe, firstName, lastName, birthDate) {
    await db.insert({userId: id, sexe: sexe, firstName: firstName, lastName: lastName, birthDate: birthDate, meetDate: '', score: '', note: ''}).into('Guests')
}

/**
 * update User in database
 * @params {int} id - id of User
 * @params {string} pseudo - name of user
 * @params {string} lastName - lastName of user
 * @params {string} password - password of user
 */
const updateUser = async function (id, mail, password, pseudo) {
    await db.from("Users").where({id: id}).update({mail: mail, password: password, pseudo: pseudo})
}

const updateGuest = async function (id, score, note) {
    await db.from("Guests").where({id: id}).update({score: score, note: note})
}

/**
 * delete User in the database
 * @params {int} id - id of User
 */
/*
const removeUser = async function (id) {
    await db.delete().from('Users').where({id: id})
}
*/

/**
 * delete Guest in the database
 * @params {int} id - id of User
 */
const deleteGuest = async function (id) {
    await db.delete().from('Guests').where({id: id})
}


/**
 * return all Guests who are never meet with the user from the database
 * @params {int} id - id of User
 */
 const getOldGuest = async function (id) {
    return await db.select('*').from('Guests').where({userId: id, hasMeet: 'true'})
}

/**
 * return all Guests who are meet from the database
 * @params {int} id - id of User
 */
const getNewGuest = async function (id) {
   return await db.select('*').from('Guests').where({userId: id, hasMeet: 'false'})
}

module.exports = {
    getNewGuest,
    getOldGuest,
    findUserByMail,
    findUserById,
    findGuestById,
    findGuestByIdentity,
    addUser,
    addGuest,
    //remove,
    deleteGuest,
    updateUser,
    updateGuest,
    //findWithId
}