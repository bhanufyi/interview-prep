const User = require('../models/User');
exports.adminMiddleware = (req, res, next) => {
  User.findById(req.user.id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    if (user.role !== "admin") {
      return res.status(403).json({
        error: "Admin Resource. Access Forbidden",
      });
    }
    
    next();
  });
};
