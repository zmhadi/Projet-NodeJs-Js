const express = require('express');
const router = express.Router();
const userRepository = require('../models/user-repository');
const { passwordsAreEqual, generateHashedPassword } = require('../security/crypto');
const { generateAuthToken } = require('../security/auth');
const { body } = require('express-validator');
const { validateBody } = require('./validation/route.validator');

router.post(
  '/login',
  body('mail').notEmpty(),
  body('mail').isEmail(),
  body('password').notEmpty(),
  async(req, res) => {
    validateBody(req);
    const { mail, password } = req.body;
    const user = await userRepository.getUserByMail(mail);
    if (!user || !(user && passwordsAreEqual(password, user.message[0].password))) {
      res.status(401).send('Unauthorized');
      return;
    }
    const token = generateAuthToken(user.id, user.firstName, user.roles);
    res.json({ token });
  }
);

exports.initializeRoutes = () => router;
