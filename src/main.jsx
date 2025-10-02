import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { MovieProvider } from "./Context/MovieContext";
import { CartProvider } from "./Context/CartContext.jsx";
import { PaymentProvider } from "./Context/Paymentcontext.jsx";
import { TicketProvider } from "./Context/Ticketcontext.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <MovieProvider>
        <CartProvider>
          <TicketProvider>
            <PaymentProvider>
              <GoogleOAuthProvider clientId="">280958126418-0l80j1g57v0p67vc0j5unk4o71jovg9d.apps.googleusercontent.com
            <App />
              </GoogleOAuthProvider>
            </PaymentProvider>
          </TicketProvider>
        </CartProvider>
      </MovieProvider>
    </BrowserRouter>
  </StrictMode>
);
