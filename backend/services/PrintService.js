const printOrder = async (order) => {
  try {
    console.log("\n");
    console.log("========================================");
    console.log("          RESTAURANT KITCHEN");
    console.log("========================================");

    console.log(`ORDER: ${order.orderId || order._id}`);
    console.log(`TABLE: ${order.tableNumber}`);
    console.log(`CUSTOMER: ${order.customerName}`);

    console.log("----------------------------------------");
    console.log("ITEMS");
    console.log("----------------------------------------");

    if (order.items && order.items.length > 0) {
      order.items.forEach((item) => {
        console.log(
          `${item.name} x${item.quantity}`
        );

        if (item.remarks) {
          console.log(
            `  Remark: ${item.remarks}`
          );
        }
      });
    }

    console.log("----------------------------------------");

    console.log(
      `TOTAL: Rs. ${order.totalAmount}`
    );

    console.log(
      `PAYMENT: ${order.paymentMethod || "N/A"}`
    );

    console.log(
      `CONFIRMED BY: ${
        order.confirmationMethod || "UNKNOWN"
      }`
    );

    console.log("========================================");
    console.log("          SEND TO KITCHEN");
    console.log("========================================");
    console.log("\n");

    return true;

  } catch (error) {
    console.error("Printing error:", error);
    return false;
  }
};

module.exports = {
  printOrder,
};