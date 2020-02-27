const router = require('express').Router();

const Users = require('../models/users-model.js');

router.get('/', (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Failed to get users', err });
    });
});

router.get('/:id', async (req, res) => {
  try {
    const user = await Users.findUser(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: 'Error retrieving the user', err
    });
  }
});


module.exports = router;
