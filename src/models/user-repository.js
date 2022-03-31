const { users } = require('./db');
const uuid = require('uuid');
const { generateHashedPassword } = require('../security/crypto');

exports.getAllUsers = async function () {
  const DAOUsers = require('../dao/DAOUsers')

    const allUsers = await DAOUsers.getAll()
    const arrayUsers = []
    for await (let user of allUsers) {
        arrayUsers.push(user)
    }
    return arrayUsers
};

exports.getUserByFirstName = async function (firstName) {
  const DAOUsers = require('../dao/DAOUsers')

    const user = await DAOUsers.find(firstName)
    console.log(user)
    if (user){
        return {status: 200, message:user}
    } else {
        return {status: 404, message:'User not exist'}
    }
};

/**
 * add new User, checks that the User does not exist
 * @param req - The params send by user with HTML request
 */
exports.add = async function (req) {
  const DAOUsers = require('../DAO/DAOUsers')
  const { firstName, lastName, password } = req.body

  if (!firstName) return {status: 422, message:'FirstName required.'}
  if (!lastName) return  {status: 422, message:'LastName required.'}
  if (!password) return {status: 422, message:'Password required.'}

  const user = await DAOUsers.find(firstName)
  if (user.length === 0){
      await DAOUsers.add(firstName, lastName, password)
      return {status: 200, message:'User Added !'}
  } else {
      return {status: 409, message:'User already exist'} //conflict
  }
}
/**
 * update User with id, checks that the User exist
 * @param req - The params send by user with HTML request
 */
exports.updateUser = (id, data) => {
  const foundUser = users.find((user) => user.id == id);

  if (!foundUser) {
    throw new Error('User not found');
  }

  foundUser.firstName = data.firstName || foundUser.firstName;
  foundUser.lastName = data.lastName || foundUser.lastName;
  foundUser.password = data.password ? generateHashedPassword(data.password) : foundUser.password;
};
/**
 * delete User with id, checks that the User exist
 * @param req - The params send by user with HTML request
 */
exports.remove = async function (req) {
  const DAOUsers = require('../DAO/DAOUsers')

  const user = await DAOUsers.findWithId(req.params.id)
  if (user.length !== 0) {
      await DAOUsers.remove(req.params.id)
      return {status: 200, message:'Removed !'}
  } else {
      return {status: 404, message:'User not exist'}
  }
}
