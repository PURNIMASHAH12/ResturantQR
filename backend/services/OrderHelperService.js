const Order = require("../models/Order");


// =========================================
// CALCULATE TOTAL
// =========================================

const total = (items) =>
  items.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );


// =========================================
// GENERATE ORDER ID
// =========================================

const generateOrderId = async (
  customerName,
  tableNumber
) => {

  const cleanName = customerName
    .trim()
    .split(/\s+/)[0]
    .replace(/[^a-zA-Z0-9]/g, "")
    .toUpperCase();

  const cleanTable = String(tableNumber)
    .trim()
    .replace(/[^a-zA-Z0-9]/g, "");

  const now = new Date();

  const hours = String(
    now.getHours()
  ).padStart(2, "0");

  const minutes = String(
    now.getMinutes()
  ).padStart(2, "0");

  const time = `${hours}${minutes}`;

  let orderId =
    `${cleanName}-T${cleanTable}-${time}`;

  const existingOrder =
    await Order.findOne({ orderId });

  if (existingOrder) {

    let count = 2;

    while (
      await Order.findOne({
        orderId:
          `${cleanName}-T${cleanTable}-${time}-${count}`,
      })
    ) {
      count++;
    }

    orderId =
      `${cleanName}-T${cleanTable}-${time}-${count}`;
  }

  return orderId;
};


module.exports = {
  total,
  generateOrderId,
};