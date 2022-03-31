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

router.get('/', guard.check(adminOrMemberRoles), (req, res) => {
  Users.getAllUsers().then(r => {
        res.send(r)
  })
});

router.get('/:firstName', guard.check(adminOrMemberRoles), (req, res) => {
  const foundUser = userRepository.getUserByFirstName(req.params.firstName);
  if (!foundUser) {
    throw new Error('User not found');
  }

  Users.getUserByFirstName(req.params.firstName).then(r => {
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

    Users.add(req).then(r => {
      res.status(r.status).send(r.message)
    })
  }
);

router.put('/:id', guard.check(adminRole), (req, res) => {
  Users.update(req).then(r => {
    res.status(r.status).send(r.message)
  })
});

router.delete('/:id', guard.check(adminRole), (req, res) => {
  Users.remove(req).then(r => {
    res.status(r.status).send(r.message)
  })
});

exports.initializeRoutes = () => router;
