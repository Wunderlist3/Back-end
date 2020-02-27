module.exports = (req, res, next) => {
  if (req.body.username && req.body.password) {
    next();
  } else {
    res.status(400).json({ message: 'Username and password required' });
  }
}
