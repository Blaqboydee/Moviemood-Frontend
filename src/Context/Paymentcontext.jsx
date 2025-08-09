import React, { createContext, useContext, useState } from 'react';

const PaymentContext = createContext();

export const usePayment = () => useContext(PaymentContext);

export const PaymentProvider = ({ children }) => {
  const [showPayment, setPaymentShow] = useState(false);
  const [totalpaymentPrice, settotalpaymentPrice] = useState("")
  const [paymentData, setPaymentData] = useState(null); // <-- e.g., {email, amount, name}

  const openPayment = (data) => {
    setPaymentData(data);
    setPaymentShow(true);
  };

  const closePayment = () => {
    setPaymentShow(false);
    setPaymentData(null);
  };

  return (
    <PaymentContext.Provider value={{ showPayment, openPayment, closePayment, paymentData, totalpaymentPrice, settotalpaymentPrice, setPaymentData }}>
      {children}
    </PaymentContext.Provider>
  );
};
