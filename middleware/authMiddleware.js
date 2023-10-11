const isLogin = (req, res, next) => {
    if (req.session.userId) {
      // User is authenticated
      next();
    } else {
      // User is not authenticated
      res.status(401).json({ error: 'Unauthorized' });
    }
  };
  
module.exports = {isLogin,}