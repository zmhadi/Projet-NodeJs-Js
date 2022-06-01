const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const userRepository = require('../models/user-repository');
const { validateBody } = require('./validation/route.validator');
const guard = require('express-jwt-permissions')({
  permissionsProperty: 'roles',
});

const adminRole = 'ADMIN';
const adminOrMemberRoles = [[adminRole], ['MEMBER']];

router.get('/newGuest/:mail', (req, res) => {
  userRepository.getNewGuest(req.params.mail).then(r => {
    res.status(r.status).send(r.message)
  })
});

router.get('/oldGuest/:mail', (req, res) => {
  userRepository.getOldGuest(req.params.mail).then(r => {
    res.status(r.status).send(r.message)
  })
});

router.get('/:mail', (req, res) => {
  const token = req.headers.authorization.split(' ')
  console.log('debug get', token[1])
  const foundUser = userRepository.getUserByMail(req.params.mail);
  if (!foundUser) {
    throw new Error('User not found');
  }

  userRepository.getUserByMail(req.params.mail).then(r => {
    res.status(r.status).send(r.message)
  })
});

router.post(
  '/',
  guard.check(adminRole),
  body('firstName').notEmpty(),
  body('lastName').notEmpty(),
  body('password').notEmpty().isLength({ min: 5 }),
  (req, res) => {
    validateBody(req);

    const existingUser = userRepository.getUserByFirstName(req.body.firstName);
    if (existingUser) {
      throw new Error('Unable to create the user');
    }

    userRepository.add(req).then(r => {
      res.status(r.status).send(r.message)
    })
  }
);

router.put('/:mail', (req, res) => {
  userRepository.updateUser(req.params.mail, req.body).then(r => {
    if(r) {
      res.status(200).end()
    }
    res.status(400).end()
  })
});

/* router.delete('/:id', guard.check(adminRole), (req, res) => {
  userRepository.remove(req).then(r => {
    res.status(r.status).send(r.message)
  })
}); */

exports.initializeRoutes = () => router;
