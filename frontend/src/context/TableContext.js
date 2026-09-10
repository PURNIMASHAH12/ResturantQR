import { createContext, useContext, useState } from "react";

const TableContext = createContext();

export function TableProvider({ children }) {

  const [customerName, setCustomerName] = useState("");
  const [tableNumber, setTableNumber] = useState("");

  const [orderType, setOrderType] = useState(
    localStorage.getItem("orderType") || "dine_in"
  );

  const [contactNumber, setContactNumber] = useState(
    localStorage.getItem("contactNumber") || ""
  );

  const [deliveryAddress, setDeliveryAddress] = useState(
    localStorage.getItem("deliveryAddress") || ""
  );

  const saveCustomerInfo = (
    name,
    table,
    type = "dine_in",
    contact = "",
    address = ""
  ) => {

    localStorage.setItem("customerName", name);
    localStorage.setItem("tableNumber", table);
    localStorage.setItem("orderType", type);
    localStorage.setItem("contactNumber", contact);
    localStorage.setItem("deliveryAddress", address);

    setCustomerName(name);
    setTableNumber(table);
    setOrderType(type);
    setContactNumber(contact);
    setDeliveryAddress(address);
  };

  const clearCustomerInfo = () => {

    localStorage.removeItem("customerName");
    localStorage.removeItem("tableNumber");
    localStorage.removeItem("orderType");
    localStorage.removeItem("contactNumber");
    localStorage.removeItem("deliveryAddress");

    setCustomerName("");
    setTableNumber("");
    setOrderType("dine_in");
    setContactNumber("");
    setDeliveryAddress("");
  };

  return (
    <TableContext.Provider
      value={{
        customerName,
        tableNumber,
        orderType,
        contactNumber,
        deliveryAddress,
        saveCustomerInfo,
        clearCustomerInfo,
      }}
    >
      {children}
    </TableContext.Provider>
  );
}

export function useTable() {
  return useContext(TableContext);
}