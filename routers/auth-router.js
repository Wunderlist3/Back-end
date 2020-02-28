const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../models/auth-model.js');

const requireRegister = require('../middleware/requireUser-middleware.js');

const secrets = require('../config/secrets.js');

// POST REGISTER USER
router.post('/register', requireRegister, (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;
  console.log('user', user);

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'User registration failed', err });
    });
});

// POST LOGIN USER
router.post('/login', requireRegister, (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = genJwtToken(user);

        res.status(200).json({
          message: `Welcome ${user.username}`,
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          token: token
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Login Failed', err });
    });
});

function genJwtToken(user) {
  const payload = {
    id: user.id,
    username: user.username
  };

  const options = {
    expiresIn: '1d'
  };

  const token = jwt.sign(payload, secrets.jwtSecret, options);

  return token;
}

module.exports = router;
