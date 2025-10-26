import { Offcanvas } from "react-bootstrap";
import { usePayment } from "../Context/Paymentcontext";
import { useTicket } from "../Context/Ticketcontext";
import { useCart } from "../Context/CartContext";
import { PaystackButton } from "react-paystack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const PaymentOffcanvas = () => {
  const navigate = useNavigate();
  const {
    showPayment,
    closePayment,
    paymentData,
    setPaymentData,
    totalpaymentPrice,
  } = usePayment();
  const { selectedSeats, ticketForMovie, ticketShowtime, selectedShowtime } = useTicket();

  const { foodItems } = useCart();

  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState("");
  const [isBuying, setIsBuying] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;


  // Email validation function
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle email change and update payment data
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    // Update payment data with new email if it's valid
    if (isValidEmail(newEmail)) {
      setPaymentData({
        ...paymentData,
        email: newEmail,
        amount: totalpaymentPrice,
      });
    }
  };

  function formatSeatsForBackend(seats) {
    const rowLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const seatsPerRow = 10;
    const totalSeats = 200;

    return seats.map((seat) => {
      const row = seat[0].toUpperCase();
      const col = parseInt(seat.slice(1));

      const rowIndex = rowLetters.indexOf(row);
      if (rowIndex === -1 || col < 1 || col > seatsPerRow) {
        throw new Error(`Invalid seat format: ${seat}`);
      }

      const seatNumber = rowIndex * seatsPerRow + col;

      if (seatNumber > totalSeats) {
        throw new Error(`Seat ${seat} exceeds total seats (${totalSeats})`);
      }

      return seatNumber.toString();
    });
  }



  const handleBuy = async (paymentReference) => {
    if (isBuying) return; // prevent double clicks
    setIsBuying(true);

    console.log("Raw Selected Seats:", selectedSeats);
    const formattedSeats = formatSeatsForBackend(selectedSeats);
    console.log("Formatted Seats:", formattedSeats);
    console.log("Showtime ID:", selectedShowtime._id);
    console.log("Booked by:", email);
    console.log("Payment Reference:", paymentReference);
    console.log("Time:", ticketShowtime.time);
    console.log("Date:", ticketShowtime.date);


    try {
      const res = await fetch(`${API_URL}/bookings/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: email,
          showtimeId: selectedShowtime._id,
          seats: formattedSeats,
          seatsTosend: selectedSeats,
          totalPrice: totalpaymentPrice,
          date: ticketShowtime.date,
          time: ticketShowtime.time,
          paymentId: paymentReference,
          FoodDrinks: foodItems || [],
          movieTitle: ticketForMovie.title
        }),
      });

      const result = await res.json();
      console.log(result);
      if (res.ok) {
        alert("Booking successful!");
        navigate("/");
        setTimeout(() => {
        window.location.reload();
        }, 100);
      } else {
        alert(result.message || "Booking failed");
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("Something went wrong");
    } finally {
      setIsBuying(false); 
    }
  };

  const paystackConfig = {
    email: email || paymentData?.email || "default@example.com",
    amount: paymentData?.amount * 100 || 10000, // Amount in kobo (₦100 = 10000)
    metadata: {
      name: paymentData?.name || "Customer",
    },
    publicKey,
    text: "Pay Now",
    onSuccess: (transaction) => {
      // transaction.reference is Paystack's unique ID for this payment
      alert("Payment Successful");
      setEmail("");
      handleBuy(transaction.reference); // pass reference to backend
      closePayment();
    },
    onClose: () => {
      closePayment();
    },
  };

  return (
    <Offcanvas
      show={showPayment}
      onHide={closePayment}
      placement="end"
      className="w-full sm:w-96"
    >
      <Offcanvas.Header className="bg-gray-800" closeButton>
        <Offcanvas.Title className="text-white text-lg sm:text-xl">
          PAYMENT
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="bg-gray-800 p-3 sm:p-4">
        <div className="bg-gray-600 rounded-xl px-4 sm:px-5 md:px-6 py-3 sm:py-4 shadow-xl w-full">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-2">
            Complete Payment
          </h2>
          <p className="text-white text-sm sm:text-base mb-4">
            You're about to make a payment.
          </p>

          {/* Email Input Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-white text-sm font-medium mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email address"
              className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {email && !isValidEmail(email) && (
              <p className="text-red-400 text-xs mt-1">
                Please enter a valid email address
              </p>
            )}
          </div>

          {paymentData ? (
            <PaystackButton
              {...paystackConfig}
              className={`w-full px-4 py-2 rounded transition-colors ${
                isValidEmail(email)
                  ? "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                  : "bg-gray-500 text-gray-300 cursor-not-allowed"
              }`}
              disabled={!isValidEmail(email)}
            />
          ) : (
            <p className="text-white">No payment data provided.</p>
          )}
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default PaymentOffcanvas;
