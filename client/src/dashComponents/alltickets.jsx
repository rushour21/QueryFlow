import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ProfileIcon from '../assets/People.png';
import { useOutletContext } from 'react-router-dom';
import '../styles/alltickets.css';

export default function Alltickets() {
  const [alltickets, setAlltickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const searchQuery = useOutletContext();
  const query = searchQuery.searchQuery;

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
        setFilteredTickets(res.data.tickets);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchTickets();
  }, []);

  // Filter tickets when search query changes
  useEffect(() => {
    if (!query || !query.trim()) {
      setFilteredTickets(alltickets);
      return;
    }

    const lowerCaseQuery = query.toLowerCase();
    const filtered = alltickets.filter(ticket => 
      // Search by ticket number
      ticket.ticketNo.toString().includes(lowerCaseQuery) ||
      // Search by message content
      (ticket.firstMessage?.text && ticket.firstMessage.text.toLowerCase().includes(lowerCaseQuery)) ||
      // Search by user details
      ticket.userDetails.name.toLowerCase().includes(lowerCaseQuery) ||
      ticket.userDetails.phone.includes(lowerCaseQuery) ||
      ticket.userDetails.email.toLowerCase().includes(lowerCaseQuery)
    );
    
    setFilteredTickets(filtered);
  }, [searchQuery, alltickets]);

  return (
    <div className='alltickets'>
      {filteredTickets.length > 0 ? (
        filteredTickets.map((ticket) => {
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
                  <div className='ticNo'><p className='dot'></p> ticket# {ticket.ticketNo}</div>
                  <p className='msg'>{ticket.firstMessage?.text}</p>
                </div>
                <div className='tickettime'>
                  <p className='exacttime'>Posted at {formattedTime}</p>
                  <p className='timeperiod'>{diffMinutes}</p>
                </div>
              </div>
              <div className='details-1'>
                <div className='info-1'>
                  <img src={ProfileIcon} alt="" />
                  <p className='user-info'>{ticket.userDetails.name} <br />{ticket.userDetails.phone} <br />{ticket.userDetails.email}</p>
                </div>
                <a href="#">Open Ticket</a>
              </div>
            </div>
          );
        })
      ) : (
        <div className="no-results">No tickets found matching your search.</div>
      )}
    </div>
  );
}