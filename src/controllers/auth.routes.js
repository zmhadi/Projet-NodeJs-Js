const express = require('express');
const router = express.Router();
const userRepository = require('../models/user-repository');
const { passwordsAreEqual, generateHashedPassword } = require('../security/crypto');
const { generateAuthToken } = require('../security/auth');
const { body, validationResult } = require('express-validator');
const { validateBody } = require('./validation/route.validator');

router.post(
  '/login',
  body('mail').isEmpty(),
  body('password').isEmpty(),
  body('mail').isEmail(),
  async(req, res) => {
    validateBody(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).end()/*.send(errors.array().map(element => element.msg))*/
    }
    console.log(req.body)
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
