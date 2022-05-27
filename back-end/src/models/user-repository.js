const { users } = require('./db');
const uuid = require('uuid');
const { generateHashedPassword } = require('../security/crypto');

exports.getOldGuest = async function (userMail) {
  const DAOUsers = require('./dao/DAOUsers')
    const guests = await DAOUsers.getOldGuest(userMail)
    const arrayGuests = []
    if(guests != undefined) {
      for await (let guest of guests) {
        arrayGuests.push(guest)
      }
      return {status: 200, message: arrayGuests}
    } else {
        return {status: 404, message:'Undefined'}
    }
};

exports.getNewGuest = async function (userMail) {
  const DAOUsers = require('./dao/DAOUsers')

    const guests = await DAOUsers.getNewGuest(userMail)
    const arrayGuests = []
    if(guests != undefined) {
      for await (let guest of guests) {
        arrayGuests.push(guest)
      }
      return {status: 200, message: arrayGuests}
    } else {
        return {status: 404, message:'Undefined'}
    }
};

/* exports.getUserByFirstName = async function (firstName) {
  const DAOUsers = require('./dao/DAOUsers')

    const user = await DAOUsers.find(firstName)
    if (user){
        return {status: 200, message:user}
    } else {
        return {status: 404, message:'User not exist'}
    }
}; */

exports.getUserByMail = async function (mail) {
  const DAOUsers = require('./dao/DAOUsers')

    const user = await DAOUsers.findUserByMail(mail)
    if (user){
        return {status: 200, message:user}
    } else {
        return {status: 404, message:'Mail not exist'}
    }
};

/**
 * add new User, checks that the User does not exist
 * @param req - The params send by user with HTML request
 */
exports.addUser = async function (data) {
  const DAOUsers = require('./DAO/DAOUsers')
  const { mail, password, pseudo } = data

  if (!mail) return {status: 422, message:'Mail required.'}
  if (!password) return  {status: 422, message:'Password required.'}
  if (!pseudo) return {status: 422, message:'Pseudo required.'}

  const user = await DAOUsers.findUserByMail(mail)
  if (user.length === 0){
      await DAOUsers.addUser(mail, password, pseudo)
      return {status: 200, message:'User Added !'}
  } else {
      return {status: 409, message:'User already exist'} //conflict
  }
}
/**
 * update User with id, checks that the User exist
 * @param req - The params send by user with HTML request
 */
exports.updateUser = async function (mail, data) {
  const DAOUsers = require('./DAO/DAOUsers')
  const foundUser = await DAOUsers.findUserByMail(mail)
  if (!foundUser) {
    throw new Error('User not found');
  }
  foundUser[0].pseudo = data.pseudo || foundUser.pseudo;
  foundUser[0].mail = data.mail || foundUser.mail;
  foundUser[0].password = data.password ? generateHashedPassword(data.password) : foundUser[0].password;

  await DAOUsers.updateUser(foundUser[0].id, foundUser[0].mail, foundUser[0].password, foundUser[0].pseudo)
  return true;
};
/**
 * delete User with id, checks that the User exist
 * @param req - The params send by user with HTML request
 */
exports.remove = async function (req) {
  const DAOUsers = require('./DAO/DAOUsers')

  const user = await DAOUsers.findWithId(req.params.id)
  if (user.length !== 0) {
      await DAOUsers.remove(req.params.id)
      return {status: 200, message:'Removed !'}
  } else {
      return {status: 404, message:'User not exist'}
  }
}
