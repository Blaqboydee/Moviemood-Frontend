import React, { useState, useEffect } from "react";
import { Offcanvas } from "react-bootstrap";
import { useCart } from "../Context/CartContext";
import "bootstrap/dist/css/bootstrap.min.css";
import MovieMood from "../assets/MovieMood-logo.png";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { usePayment } from "../Context/Paymentcontext";

const Navbar = () => {
  const { openPayment } = usePayment();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const { foodItems, totalPrice, show, setShow } = useCart();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // JWT decode function
  const parseJwt = (token) => {
    try {
      const base64Payload = token.split(".")[1];
      const jsonPayload = atob(base64Payload);
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  };

  // Check token and extract isAdmin & login state
  const checkAuthStatus = () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decoded = parseJwt(token);
      if (decoded && decoded.isAdmin !== undefined) {
        setIsAdmin(decoded.isAdmin);
      } else {
        setIsAdmin(false);
      }
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
    const userStr = localStorage.getItem("user");
    const userObj = userStr ? JSON.parse(userStr) : null;
    setUserEmail(userObj?.email || "");
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate("/");
  };

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to an element by id with smooth behavior
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Navigation links based on login/admin status
  // For MOVIES link, we replace navigation with scroll
  const navLinks = isLoggedIn
    ? isAdmin
      ? [
          { name: "HOME", path: "/" },
          { name: "MOVIES", scrollId: "movies-section" }, // scroll instead of route
          { name: "MY ORDERS", path: `/myorders` },
          { name: "DASHBOARD", path: "/dashboard" },
          { name: "LOG OUT", action: handleLogout },
        ]
      : [
          { name: "HOME", path: "/" },
          { name: "MOVIES", scrollId: "movies-section" },
          { name: "ABOUT", path: "/aboutmoviemood" },
          { name: "MY ORDERS", path: `/myorders` },
          { name: "LOG OUT", action: handleLogout },
        ]
    : [
        { name: "HOME", path: "/" },
        { name: "MOVIES", scrollId: "movies-section" },
        { name: "ABOUT", path: "/aboutmoviemood" },
        { name: "CONTACT", path: "/contact" },
        { name: "LOG IN / SIGN UP", path: "/login" },
      ];

  return (
    <>
      {/* Top Navbar */}
      <nav
        className={`w-full px-6 sm:px-4 md:px-6 lg:px-8 xl:px-16 py-2 sm:py-3 md:py-2 lg:py-0 fixed z-50 transition-all duration-300 ${
          isScrolled ? "bg-black/10 backdrop-blur-lg shadow-lg" : "bg-black/10"
        }`}
      >
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src={MovieMood}
              alt="Filmhouse Logo"
              className="h-12 sm:h-16 md:h-18 lg:h-20 xl:h-22 2xl:h-24 w-auto"
            />
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center flex-1 justify-center ">
            <div className="flex items-center justify-center space-x-6 xl:space-x-8 2xl:space-x-12">
              {navLinks.map((item) =>
                item.action ? (
                  <span
                    key={item.name}
                    onClick={item.action}
                    className="cursor-pointer text-white no-underline hover:text-blue-400 font-medium text-xs xl:text-sm 2xl:text-[13px] transition-colors duration-200 whitespace-nowrap"
                  >
                    {item.name}
                  </span>
                ) : item.scrollId ? (
                  <span
                    key={item.name}
                    onClick={() => scrollToSection(item.scrollId)}
                    className="cursor-pointer text-white no-underline hover:text-blue-400 font-medium text-xs xl:text-sm 2xl:text-[13px] transition-colors duration-200 whitespace-nowrap"
                  >
                    {item.name}
                  </span>
                ) : (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) =>
                      `text-white no-underline hover:text-blue-400 font-medium text-xs xl:text-sm 2xl:text-[13px] transition-colors duration-200 whitespace-nowrap ${
                        isActive ? "text-blue-400" : ""
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                )
              )}
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 flex-shrink-0">
            {/* Desktop Cart */}
            <div className="hidden lg:block">
              <button
                onClick={() => setShow(true)}
                className="text-white no-underline hover:text-blue-400 font-medium text-xs xl:text-sm 2xl:text-[13px] transition-colors duration-200 bg-transparent border-none cursor-pointer"
              >
                CART
                {foodItems.length > 0 && (
                  <span className="ml-2 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs">
                    {foodItems.reduce(
                      (total, item) => total + item.quantity,
                      0
                    )}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Cart */}
            <div className="lg:hidden">
              <button
                onClick={() => setShow(true)}
                className="text-white hover:text-blue-400 focus:outline-none text-lg sm:text-xl relative p-2 bg-transparent border-none cursor-pointer"
              >
                🛒
                {foodItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-xs font-bold">
                    {foodItems.reduce(
                      (total, item) => total + item.quantity,
                      0
                    )}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={toggleMenu}
                className="text-white hover:text-blue-400 focus:outline-none text-xl sm:text-2xl p-2 bg-transparent border-none cursor-pointer"
              >
                {menuOpen ? "✕" : "☰"}
              </button>
            </div>
          </div>
        </div>

        {/* Cart Offcanvas */}
        <Offcanvas
          show={show}
          onHide={() => setShow(false)}
          placement="end"
          className="w-full sm:w-96"
        >
          <Offcanvas.Header className="bg-gray-800" closeButton>
            <Offcanvas.Title className="text-white text-lg sm:text-xl">
              CART
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="bg-gray-800 p-3 sm:p-4">
            <div className="bg-gray-600 rounded-xl px-4 sm:px-5 md:px-6 py-3 sm:py-4 shadow-xl w-full">
              <h2 className="text-lg sm:text-xl font-bold text-white mb-3">
                Order Summary
              </h2>

              {foodItems.length === 0 ? (
                <p className="text-white text-sm sm:text-base">
                  No items selected.
                </p>
              ) : (
                <>
                  <ul className="mb-4 space-y-2">
                    {foodItems.map((item) => (
                      <li
                        key={item.foodId}
                        className="flex justify-between items-center text-xs sm:text-sm text-white p-2 bg-gray-700/50 rounded-lg"
                      >
                        <span className="flex-1 pr-2">
                          {item.name} x {item.quantity}
                        </span>
                        <span className="font-semibold">
                          ₦{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-between font-bold text-sm sm:text-base text-white pt-3 border-t border-gray-500">
                    <span>Total:</span>
                    <span className="text-green-400">
                      ₦{totalPrice.toLocaleString()}
                    </span>
                  </div>
                </>
              )}
            </div>
            <button
              onClick={openPayment}
              className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-xl"
            >
              To Payment
            </button>
          </Offcanvas.Body>
        </Offcanvas>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed w-full shadow-lg transition-all duration-300 ease-in-out z-40 ${
          menuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        } ${
          isScrolled
            ? "bg-black/90 backdrop-blur-lg border-b border-white/10 top-12 sm:top-16"
            : "bg-black/95 backdrop-blur-sm top-12 sm:top-16"
        }`}
      >
        <div className="px-3 sm:px-4 pt-3 sm:pt-4 pb-4 sm:pb-6 space-y-2 sm:space-y-3">
          {navLinks.map((item) =>
            item.action ? (
              <span
                key={item.name}
                onClick={() => {
                  item.action();
                  setMenuOpen(false);
                }}
                className="block cursor-pointer px-3 py-2 sm:py-3 rounded-md font-medium text-xs sm:text-sm text-white hover:text-blue-400 hover:bg-white/10"
              >
                {item.name}
              </span>
            ) : item.scrollId ? (
              <span
                key={item.name}
                onClick={() => {
                  scrollToSection(item.scrollId);
                  setMenuOpen(false);
                }}
                className="block cursor-pointer px-3 py-2 sm:py-3 rounded-md font-medium text-xs sm:text-sm text-white hover:text-blue-400 hover:bg-white/10"
              >
                {item.name}
              </span>
            ) : (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className="block no-underline px-3 py-2 sm:py-3 rounded-md font-medium text-xs sm:text-sm text-white hover:text-blue-400 hover:bg-white/10"
              >
                {item.name}
              </Link>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
