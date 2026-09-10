const mongoose = require("mongoose");
const Food = require("../models/Food");


// =========================================
// PREPARE ORDER ITEMS
// =========================================

const prepareItems = async (items) => {

  if (!Array.isArray(items) || !items.length) {
    throw new Error(
      "Order must contain at least one item."
    );
  }

  const result = [];

  for (const item of items) {

    if (
      !item.food ||
      !mongoose.Types.ObjectId.isValid(item.food)
    ) {
      throw new Error(
        "Invalid food item in order."
      );
    }

    const quantity = Number(item.quantity);

    if (
      !Number.isInteger(quantity) ||
      quantity < 1
    ) {
      throw new Error(
        "Item quantity must be at least 1."
      );
    }

    const food =
      await Food.findById(item.food);

    if (!food) {
      throw new Error(
        `Food item not found: ${item.food}`
      );
    }

    if (!food.available) {
      throw new Error(
        `${food.name} is currently unavailable.`
      );
    }

    result.push({
      food: food._id,
      name: food.name,
      price: Number(food.price),
      quantity,
      remarks:
        item.remarks?.trim() || "",
    });
  }

  return result;
};


// =========================================
// VALIDATE CREATE ORDER
// =========================================

const validateCreateOrder = (data) => {

  const {
    orderType = "dine_in",
    customerName,
    tableNumber,
    contactNumber,
    deliveryAddress,
    paymentMethod,
    confirmationMethod,
  } = data;


  // Order type

  if (
    !["dine_in", "parcel"]
      .includes(orderType)
  ) {
    return "Invalid order type.";
  }


  // Customer name

  if (!customerName?.trim()) {
    return "Customer name is required.";
  }


  // Dine-in

  if (orderType === "dine_in") {

    if (
      tableNumber === undefined ||
      tableNumber === null ||
      !String(tableNumber).trim()
    ) {
      return "Table number is required for dine-in orders.";
    }
  }


  // Parcel

  if (orderType === "parcel") {

    if (!contactNumber?.trim()) {
      return "Contact number is required for parcel orders.";
    }

    if (!deliveryAddress?.trim()) {
      return "Delivery address is required for parcel orders.";
    }
  }


  // Payment

  if (
    !["counter", "online"]
      .includes(paymentMethod)
  ) {
    return "Invalid payment method.";
  }


  // Confirmation

  if (orderType === "parcel") {

    if (
      confirmationMethod !== "waiter"
    ) {
      return "Parcel orders must be confirmed by the waiter.";
    }

  } else {

    if (
      !["customer", "waiter"]
        .includes(confirmationMethod)
    ) {
      return "Invalid confirmation method.";
    }
  }


  return null;
};


module.exports = {
  prepareItems,
  validateCreateOrder,
};