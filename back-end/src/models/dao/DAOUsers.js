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
 * add new User in database
 * @params {string} mail - mail of user
 * @params {string} pseudo - pseudo of user
 * @params {string} password - password of user
 */
const addUser = async function ( mail, password, pseudo) {
    await db.insert({mail: mail, password: password, pseudo: pseudo}).into('Users')
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
 * return all Guests who are never meet with the user from the database
 * @params {int} id - id of User
 */
 const getOldGuest = async function (id) {
    return await db.select('*').from('Guests').where({userId: id})
}

/**
 * return all Guests who are meet from the database
 * @params {int} id - id of User
 */
const getNewGuest = async function (id) {
   return await db.select('*').from('Guests').where('userId', '!=', id)
}

module.exports = {
    getNewGuest,
    getOldGuest,
    findUserByMail,
    findUserById,
    addUser,
    //remove,
    updateUser,
    //findWithId
}