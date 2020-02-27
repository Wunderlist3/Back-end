module.exports = (req, res, next) => {
  const { title, task, setDate, user_id } = req.body;
  title && task && setDate && user_id
    ? next()
    : res.status(400).json({ message: 'Missing field requirement' });
};
