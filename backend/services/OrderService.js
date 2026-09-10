const mongoose = require("mongoose");
const Order = require("../models/Order");
const { prepareItems, validateCreateOrder,} = require("./OrderValidationService");
const { total,generateOrderId,} = require("./OrderHelperService");
const { getIO } = require("../socket");
const { printOrder } = require("./PrintService");
const getOrder = (id) =>
  Order.findById(id).populate(
    "items.food",
    "name price"
  );
const createOrder = async (data) => {
  console.log("CREATE ORDER API CALLED");
  console.log("BODY:", data);
  const validationError =
    validateCreateOrder(data);
  if (validationError) {
    return {
      status: 400,
      data: { success: false, message: validationError,
      },};}
  const {
    orderType = "dine_in",
    customerName,
    tableNumber,
    contactNumber,
    deliveryAddress,
    items,
    paymentMethod,
    confirmationMethod,
  } = data;
  let prepared;
  try {
    prepared =await prepareItems(items);
  } catch (error) {
    return {
      status: 400,
      data: { success: false, message: error.message,
      },}; }
  const orderId =
    await generateOrderId(
      customerName,
      orderType === "parcel"
        ? "PARCEL"
        : tableNumber
    );
  const order =await Order.create({orderType,orderId,customerName:customerName.trim(),
      tableNumber: orderType === "dine_in"
          ? String(tableNumber).trim()
          : "",
      contactNumber: orderType === "parcel"
          ? contactNumber.trim()
          : "",
      deliveryAddress: orderType === "parcel"
          ? deliveryAddress.trim()
          : "",
      items: prepared,totalAmount: total(prepared),
      paymentMethod,
      status: confirmationMethod === "waiter"
          ? "waiter_requested"
          : "pending",
      confirmationMethod: null,
    });
  console.log("NEW ORDER ID:",order.orderId);
  console.log("ORDER TYPE:",order.orderType);
  console.log( "FULL ORDER:", order);
  const result = await getOrder(order._id);
  getIO().emit( "new-order", result);
  return {
    status: 201, data: {success: true,message:  "Order placed successfully.",order: result,
    },};};

const getOrders = async () => {
  const orders = await Order.find()
      .populate("items.food","name price")
      .sort({  createdAt: -1,});
  return {status: 200,data: {  success: true,  orders,
    }, };};
const getOrderById = async (id) => {
  if ( !mongoose.Types.ObjectId.isValid(id) ) {
    return {status: 400,data: {  success: false,  message:"Invalid order ID.",
      },};}
  const order =await getOrder(id);
  if (!order) {
    return { status: 404,data: { success: false, message: "Order not found.",
      },}; }
  return {status: 200,data: {success: true,  order,
    },};};
const updateOrder = async (id,data) => {
  const order = await Order.findById(id);
  if (!order) {
    return {status: 404,data: { success: false, message:"Order not found.",
      }, };}
  if (
  order.status !== "pending" &&
  order.status !== "waiter_requested"
) {
    return {
      status: 400,
      data: {
        success: false,
        message:
          "Only waiter-requested orders can be edited.",
      },
    };
  }


  let items;

  try {

    items =
      await prepareItems(
        data.items
      );

  } catch (error) {

    return {
      status: 400,
      data: {
        success: false,
        message: error.message,
      },
    };
  }


  order.items = items;

  order.totalAmount =
    total(items);


  await order.save();


  const result =
    await getOrder(id);


  getIO().emit(
    "order-updated",
    result
  );


  return {
    status: 200,
    data: {
      success: true,
      message:
        "Order updated successfully.",
      order: result,
    },
  };
};


// =========================================
// CONFIRM ORDER
// =========================================

const confirmOrder = async (
  id,
  confirmationMethod
) => {

  const order =
    await Order.findById(id);


  if (!order) {
    return {
      status: 404,
      data: {
        success: false,
        message:
          "Order not found.",
      },
    };
  }


  const valid =
    (
      confirmationMethod === "customer" &&
      order.status === "pending"
    ) ||
    (
      confirmationMethod === "waiter" &&
      order.status ===
        "waiter_requested"
    );


  if (!valid) {
    return {
      status: 400,
      data: {
        success: false,
        message:
          "Order cannot be confirmed in its current status.",
      },
    };
  }


  order.status =
    "confirmed";

  order.confirmationMethod =
    confirmationMethod;


  await order.save();


  const result =
    await getOrder(id);


  const io = getIO();


  io.emit(
    "order-updated",
    result
  );

  io.emit(
    "order-confirmed",
    result
  );

  io.emit(
    "order-confirmed-kitchen",
    result
  );


  return {
    status: 200,
    data: {
      success: true,
      message:
        "Order confirmed successfully.",
      order: result,
    },
  };
};


// =========================================
// UPDATE ORDER STATUS
// =========================================

const updateOrderStatus = async (
  id,
  status
) => {

  const order =
    await Order.findById(id);


  if (!order) {
    return {
      status: 404,
      data: {
        success: false,
        message:
          "Order not found.",
      },
    };
  }


  const nextStatus = {

    confirmed: "preparing",

    preparing: "ready",

    ready: "completed",

  };


  if (status === "cancelled") {

    if (
      order.status === "completed" ||
      order.status === "cancelled"
    ) {
      return {
        status: 400,
        data: {
          success: false,
          message:
            "This order cannot be cancelled.",
        },
      };
    }

    order.status =
      "cancelled";

  } else {

    const expectedNext =
      nextStatus[order.status];


    if (
      expectedNext !== status
    ) {
      return {
        status: 400,
        data: {
          success: false,
          message:
            `Cannot change order from "${order.status}" to "${status}".`,
        },
      };
    }


    order.status = status;
  }


  await order.save();


  const result =
    await getOrder(id);


  const io = getIO();


  io.emit(
    "order-updated",
    result
  );


  if (status === "preparing") {
    io.emit(
      "order-preparing",
      result
    );
  }

  if (status === "ready") {
    io.emit(
      "order-ready",
      result
    );
  }

  if (status === "completed") {
    io.emit(
      "order-completed",
      result
    );
  }

  if (status === "cancelled") {
    io.emit(
      "order-cancelled",
      result
    );
  }


  return {
    status: 200,
    data: {
      success: true,
      message:
        "Order status updated successfully.",
      order: result,
    },
  };
};


// =========================================
// PRINT CONFIRMED ORDER
// =========================================

const printConfirmedOrder = async (
  id
) => {

  const order =
    await getOrder(id);


  if (!order) {
    return {
      status: 404,
      data: {
        success: false,
        message:
          "Order not found.",
      },
    };
  }


  if (order.status !== "confirmed") {
    return {
      status: 400,
      data: {
        success: false,
        message:
          "Only confirmed orders can be printed.",
      },
    };
  }


  const printed =
    await printOrder(order);


  if (!printed) {
    return {
      status: 500,
      data: {
        success: false,
        message:
          "Failed to print order.",
      },
    };
  }


  return {
    status: 200,
    data: {
      success: true,
      message:
        "Order sent to kitchen printer.",
    },
  };
};


module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  confirmOrder,
  updateOrderStatus,
  printConfirmedOrder,
};