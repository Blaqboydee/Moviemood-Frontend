import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Offcanvas, Button } from "react-bootstrap";
import { useCart } from "../Context/CartContext";
import { Plus, Minus } from "lucide-react";
import { FaNairaSign } from "react-icons/fa6";
import { useTicket } from "../Context/Ticketcontext";
import { usePayment } from "../Context/Paymentcontext";

const FoodAndDrinks = () => {
  const { openPayment, totalpaymentPrice, settotalpaymentPrice } = usePayment();

  const [foodAndDrinks, setfoodanddrinks] = useState([]);

  const {
    foodItems,
    updateQuantity,
    getItemQuantity,
    totalPrice,
    show,
    setShow,
  } = useCart();
  const { selectedSeats, ticketForMovie, ticketShowtime } = useTicket();

  useEffect(() => {
    console.log(ticketForMovie);
    console.log(ticketShowtime);

    const fetchallfoods = async () => {
      try {
        const res = await axios.get("http://localhost:6176/food/fetchfoods");
        const allfoods = res.data.data;
        setfoodanddrinks(res.data.data);
        console.log(allfoods);
        ticketForMovie;
      } catch (error) {
        console.log(error);
      }
    };
    fetchallfoods();
  }, []);

  return (
    <div className="min-h-screen bg-gray-700 py-8 sm:py-12 md:py-16 lg:py-24 xl:py-32 px-2 sm:px-4 md:px-6 lg:px-8 relative">
      {/* Selected Seats Info - Responsive */}
      <div className="mt-16 mb-24 mx-4 sm:mx-6 md:mx-12 lg:mx-20 xl:mx-32 p-6 bg-white/10 rounded-xl shadow-lg border border-white/10 backdrop-blur">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-4">
          Booking Details
        </h2>

        <div className="space-y-3 text-sm sm:text-base text-white">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <span className="text-green-300 font-medium">Selected Seats:</span>
            <span className="text-green-100">
              {selectedSeats.length > 0
                ? selectedSeats.join(", ")
                : "No seats selected"}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <span className="text-green-300 font-medium">Movie Title:</span>
            <span className="text-green-100">{ticketForMovie.title}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <span className="text-green-300 font-medium">
              Total Ticket Price:
            </span>
            <span className="text-green-100 flex items-center gap-1">
              ₦{" "}
              {selectedSeats.length > 0
                ? ticketForMovie.price * selectedSeats.length
                : 0}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <span className="text-green-300 font-medium">Time:</span>
            <span className="text-green-100">{ticketShowtime.time}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <span className="text-green-300 font-medium">Date:</span>
            <span className="text-green-100">{ticketShowtime.date}</span>
          </div>
        </div>
      </div>

      {/* Product Cards Grid - Fully Responsive */}
      <div className="max-w-full mx-auto pb-24 sm:pb-32 md:pb-40">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-5 md:gap-6 lg:gap-8 justify-items-center px-2 sm:px-4">
          {foodAndDrinks.map((food) => (
            <div
              key={food._id}
              className="bg-gray-800 w-full max-w-[160px] sm:max-w-[280px] min-w-[140px] sm:min-w-[240px] flex flex-col items-center justify-between h-auto min-h-[200px] sm:min-h-[300px] md:min-h-[320px] p-3 sm:p-5 md:p-6 relative mb-20 sm:mb-28 md:mb-32 lg:mb-36 shadow-md rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-[4rem] sm:rounded-br-[8rem] md:rounded-br-[10rem] transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              {/* Image - Responsive */}
              <div className="flex justify-center -mt-16 sm:-mt-24 md:-mt-28 mb-2 sm:mb-4">
                <img
                  className="w-[120px] h-[120px] sm:w-[200px] sm:h-[200px] md:w-[220px] md:h-[220px] lg:w-[240px] lg:h-[240px] p-1 sm:p-2 object-cover rounded-lg transition-transform duration-300 hover:scale-110"
                  src={food.foodImage}
                  alt={food.name}
                />
              </div>

              {/* Info - Responsive */}
              <div className="text-white text-left w-full flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-xs sm:text-lg md:text-xl mb-1 w-full line-clamp-2 leading-tight">
                    {food.name}
                  </h3>
                  <p className="flex items-center text-white font-bold w-full">
                    <FaNairaSign className="mr-1 text-sm sm:text-xl flex-shrink-0" />
                    <span className="text-sm sm:text-2xl">{food.price}</span>
                  </p>
                </div>
              </div>

              {/* Quantity Controls - Responsive */}
              <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4">
                <div className="bg-black rounded-full p-1.5 sm:p-2 flex flex-col items-center gap-1 sm:gap-2 shadow-lg">
                  {/* Increase */}
                  <button
                    onClick={() =>
                      updateQuantity(food._id, 1, food.price, food.name)
                    }
                    className="bg-white rounded-full p-1 sm:p-2 hover:bg-gray-100 transition-all duration-200 transform hover:scale-110 active:scale-95"
                  >
                    <Plus size={10} className="sm:w-4 sm:h-4 text-black" />
                  </button>

                  {/* Quantity Display */}
                  <span className="text-white font-bold text-xs sm:text-base lg:text-lg min-w-[16px] sm:min-w-[24px] text-center">
                    {getItemQuantity(food._id)}
                  </span>

                  {/* Decrease */}
                  <button
                    onClick={() => updateQuantity(food._id, -1)}
                    className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-all duration-200 transform hover:scale-110 active:scale-95"
                    disabled={getItemQuantity(food._id) === 0}
                  >
                    <Minus size={10} className="sm:w-4 sm:h-4 text-black" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary fixed at bottom - Enhanced Responsiveness */}
      {foodItems.length === 0 && (
        <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2  rounded-2xl px-4 sm:px-5 md:px-6 py-3 sm:py-4 shadow-2xl hover:shadow-3xl w-[95%] sm:w-[90%] max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl transition-all duration-300 ease-out transform hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.98] active:translate-y-0 backdrop-blur-sm z-50">
          <div className="bg-slate-800/50 backdrop-blur-[13px] rounded-2xl border border-slate-600/30 p-4 sm:p-5 md:p-6 text-center shadow-2xl">
            <p className="text-slate-300 text-xs sm:text-sm mb-3 font-medium">
              Not hungry?
            </p>
            <button
              onClick={() => {
                const calculatedPayment =
                  (selectedSeats.length > 0
                    ? ticketForMovie.price * selectedSeats.length
                    : 0);

                settotalpaymentPrice(calculatedPayment);
                console.log(totalpaymentPrice);
                
                openPayment();
              }}
              className="inline-flex items-center gap-2 px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 bg-emerald-500/80 text-white font-semibold text-xs sm:text-sm rounded-full hover:bg-emerald-500 transition-all duration-200 transform hover:scale-105 active:scale-95 w-full sm:w-auto justify-center"
            >
              <span className="whitespace-nowrap">
                Skip and continue to payment
              </span>
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Review and Pay Button - Enhanced Responsiveness */}
      {foodItems.length > 0 && (
        <button
          onClick={() => {
            settotalpaymentPrice(
              (selectedSeats.length > 0
                ? ticketForMovie.price * selectedSeats.length
                : 0) + totalPrice
            );
            console.log(totalpaymentPrice);

            setShow(true);
          }}
          className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 active:from-gray-900 active:to-black rounded-2xl px-4 sm:px-5 md:px-6 py-3 sm:py-4 shadow-2xl hover:shadow-3xl w-[95%] sm:w-[90%] max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl border border-gray-600 hover:border-gray-500 transition-all duration-300 ease-out transform hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.98] active:translate-y-0 backdrop-blur-sm z-50"
        >
          <div className="flex justify-between items-center font-semibold text-sm sm:text-base text-white">
            <span className="flex items-center">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 mr-2 transition-transform duration-300 group-hover:rotate-12 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                Review and Pay
              </span>
            </span>
            <span className="font-bold text-green-400 transition-colors duration-200 ml-2 whitespace-nowrap text-sm sm:text-base">
              ₦{totalPrice.toLocaleString()} + ₦
              {(selectedSeats.length > 0
                ? ticketForMovie.price * selectedSeats.length
                : 0
              ).toLocaleString()}{" "}
              ={" "}
              {(
                (selectedSeats.length > 0
                  ? ticketForMovie.price * selectedSeats.length
                  : 0) + totalPrice
              ).toLocaleString()}
            </span>
          </div>

          {/* Subtle loading indicator for when clicked */}
          <div className="absolute inset-0 bg-gray-700 rounded-2xl opacity-0 hover:opacity-10 transition-opacity duration-200"></div>

          {/* Ripple effect overlay */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-white opacity-0 hover:opacity-5 transition-opacity duration-200 transform scale-0 hover:scale-100"></div>
          </div>
        </button>
      )}
    </div>
  );
};

export default FoodAndDrinks;
