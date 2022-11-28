const isAdmin = (req, res, next) => {
  if (req.user && req.user.role.toLowerCase() === 'admin') {
    return next();
  }

  res.status(403).json({ message: 'Unauthorized role should be admin' });
};

module.exports = isAdmin;
