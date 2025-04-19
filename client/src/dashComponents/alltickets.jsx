import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ProfileIcon from '../assets/People.png';
import '../styles/alltickets.css';

export default function Alltickets() {
  const [alltickets, setAlltickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/tickets/allTickets`, {
          headers: {
            Authorization: token,
          },
        });
        console.log("API Response:", res.data.tickets);
        setAlltickets(res.data.tickets);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchTickets();
  }, []);

  return (
    <div className='alltickets'>
      {alltickets.map((ticket) => {
        const createdAt = new Date(ticket.createdAt);

        // Format time as 10:00 AM
        const formattedTime = createdAt.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        });

        // Calculate minutes passed since createdAt
        const now = new Date();
        const diffMs = now - createdAt;
        const diffMinutes = Math.floor(diffMs / (1000 * 60));

        return (
          <div key={ticket.ticketNo} className='ticketcard'>
            <div className='details'>
              <div className='ticketinfo'>
                <p><span></span> ticket# {ticket.ticketNo}</p>
                <p>{ticket.firstMessage?.text}</p>
              </div>
              <div className='tickettime'>
                <p>Posted at {formattedTime}</p>
                <p>{diffMinutes}</p>
              </div>
            </div>
            <div className='userDetails'>
              <div className='details'>
                <img src={ProfileIcon} alt="" />
                <div className='user-info'>
                    <p>{ticket.userDetails.name}</p>
                    <p>{ticket.userDetails.phone}</p>
                    <p>{ticket.userDetails.email}</p>
                </div>
              </div>
              <a href="#">Open Ticket</a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
