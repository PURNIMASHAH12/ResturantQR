const cron = require("node-cron");
const Order = require("../models/Order");

const startOrderCleanup = () => {
  // Runs every 10 minutes
  cron.schedule("*/10 * * * *", async () => {
    try {
      const oneHourAgo = new Date(
        Date.now() - 60 * 60 * 1000
      );

      const result = await Order.updateMany(
        {
          status: {
            $in: ["pending", "waiter_requested"],
          },
          createdAt: {
            $lt: oneHourAgo,
          },
        },
        {
          $set: {
            status: "cancelled",
          },
        }
      );

      if (result.modifiedCount > 0) {
        console.log(
          `${result.modifiedCount} old order(s) automatically cancelled.`
        );
      }
    } catch (error) {
      console.error(
        "Order cleanup failed:",
        error.message
      );
    }
  });

  console.log("Order cleanup cron job started.");
};

module.exports = startOrderCleanup;