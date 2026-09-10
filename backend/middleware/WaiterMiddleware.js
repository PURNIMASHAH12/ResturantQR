const waiterOnly = (req, res, next) => {

  if (!req.user || req.user.role !== "waiter") {
    return res.status(403).json({
      message: "Waiter access required.",
    });
  }

  next();
};

module.exports = {
  waiterOnly,
};