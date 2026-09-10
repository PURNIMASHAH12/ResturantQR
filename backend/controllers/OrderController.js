const OrderService = require("../services/OrderService");


// CREATE ORDER
const createOrder = async (req, res) => {
  try {
    const result = await OrderService.createOrder(req.body);

    res.status(result.status).json(result.data);

  } catch (error) {
    console.error("Create order error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// GET ALL ORDERS
const getOrders = async (req, res) => {
  try {
    const result = await OrderService.getOrders();

    res.status(result.status).json(result.data);

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// GET ORDER BY ID
const getOrderById = async (req, res) => {
  try {
    const result = await OrderService.getOrderById(
      req.params.id
    );

    res.status(result.status).json(result.data);

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// UPDATE ORDER
const updateOrder = async (req, res) => {
  try {
    const result = await OrderService.updateOrder(
      req.params.id,
      req.body
    );

    res.status(result.status).json(result.data);

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// CONFIRM ORDER
const confirmOrder = async (req, res) => {
  try {
    const result = await OrderService.confirmOrder(
      req.params.id,
      req.body.confirmationMethod
    );

    res.status(result.status).json(result.data);

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// UPDATE ORDER STATUS
const updateOrderStatus = async (req, res) => {
  try {
    const result = await OrderService.updateOrderStatus(
      req.params.id,
      req.body.status
    );

    res.status(result.status).json(result.data);

  } catch (error) {
    console.error(
      "Update order status error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// PRINT CONFIRMED ORDER
const printConfirmedOrder = async (req, res) => {
  try {
    const result = await OrderService.printConfirmedOrder(
      req.params.id
    );

    res.status(result.status).json(result.data);

  } catch (error) {
    console.error(
      "Print order error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
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