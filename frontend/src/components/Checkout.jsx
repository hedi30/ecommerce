import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
const Checkout = ({ disabled, price, onSuccess }) => {
  const handleSuccess = (details) => {
    console.log("Transaction completed by", details.payer.name.given_name);
    console.log("Transactin details", details);
    if (onSuccess) {
      onSuccess(details);
    }
  };

  return (
    <div>
      <PayPalScriptProvider
        options={{
          clientId:
            "AYltu4twf5w_KPzSa_erurjH_j8CKPLJZZqFrs8VV6gautasYA5Dj4qAY-Hu-ZfeToJXgYZX-YL0Q-67",
        }}
      >
        {!disabled && (
          <PayPalButtons
            style={{ layout: "horizontal" }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: price,
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then((details) => {
                handleSuccess(details);
              });
            }}
            onError={(err) => {
              console.error("PayPal Checkout onError", err);
            }}
          />
        )}
      </PayPalScriptProvider>
    </div>
  );
};
export default Checkout;
