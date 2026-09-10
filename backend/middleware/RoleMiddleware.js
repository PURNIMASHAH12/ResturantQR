const adminOrWaiter = (req, res, next) => {
  if (
    !req.user ||
    (req.user.role !== "admin" &&
      req.user.role !== "waiter")
  ) {
    return res.status(403).json({
      message: "Admin or waiter access required.",
    });
  }

  next();
};

module.exports = {
  adminOrWaiter,
};