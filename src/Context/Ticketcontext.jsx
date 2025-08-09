import { createContext, useContext, useState } from "react";

const TicketContext = createContext();

export const useTicket = () => useContext(TicketContext);

export const TicketProvider = ({ children }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [ticketForMovie, setticketForMovie] = useState({})
  const [ticketShowtime, setticketShowtime] = useState({})

  return (
    <TicketContext.Provider value={{ selectedSeats, setSelectedSeats, setticketForMovie, ticketForMovie, ticketShowtime, setticketShowtime, selectedShowtime, setSelectedShowtime}}>
      {children}
    </TicketContext.Provider>
  );
};
