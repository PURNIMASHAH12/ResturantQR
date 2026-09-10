const superAdminOnly = (req, res, next) => {

  if (!req.user || req.user.role !== "superadmin") {
    return res.status(403).json({
      message: "Super Admin access required.",
    });
  }

  next();
};

module.exports = {
  superAdminOnly,
};