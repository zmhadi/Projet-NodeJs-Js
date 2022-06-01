const db = require('../db')

/**
 * return all Users from the database
 */
 const getOldGuest = async function (id) {
    const user = await findUserById(id)
    return await db.select('*').from('Guest').where({userMail: user[0].mail})
}

/**
 * return all Users from the database
 */
const getNewGuest = async function (id) {
   const user = await findUserById(id)
   return await db.select('*').from('Guest').where('userMail', '!=', user[0].mail)
}

/**
 * return one User with id from the database
 * @params {string} pseudo - pseudo of User
 */
const findUserByMail = async function (mail) {
    return await db.select('*').from('Users').where({mail: mail})
}

const findUserById = async function (id) {
    return await db.select('*').from('Users').where({id: id})
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
const addUser = async function ( mail, password, pseudo) {
    await db.insert({mail: mail, password: password, pseudo: pseudo}).into('Users')
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
const updateUser = async function (id, mail, password, pseudo) {
    await db.from("Users").where({id: id}).update({mail: mail, password: password, pseudo: pseudo})
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