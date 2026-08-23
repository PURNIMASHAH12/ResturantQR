import { createContext, useContext, useState } from "react";

const TableContext = createContext();
export function TableProvider({ children }) {
  const [customerName, setCustomerName] = useState(
    localStorage.getItem("customerName") || ""
  );
  const [tableNumber, setTableNumber] = useState(
    localStorage.getItem("tableNumber") || ""
  );
  const saveCustomerInfo = (name, table) => {
    localStorage.setItem("customerName", name);
    localStorage.setItem("tableNumber", table);
    setCustomerName(name);
    setTableNumber(table);
  };
  const clearCustomerInfo = () => {
    localStorage.removeItem("customerName");
    localStorage.removeItem("tableNumber");
    setCustomerName("");
    setTableNumber("");
  };
  return (
    <TableContext.Provider
      value={{
        customerName,
        tableNumber,
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