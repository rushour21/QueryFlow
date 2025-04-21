import React, { useState, useEffect } from 'react';
import People from '../assets/People.png';
import axios from 'axios';
import { House, SquareUserRound, Phone, Mail } from 'lucide-react';
import { MdSend } from 'react-icons/md';

import '../styles/contactCenter.css';

export default function ContactCenter() {
  const [username, setUsername] = useState('');
  const [allTickets, setAllTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const getUsername = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/getusername`, {
          headers: {
            Authorization: token,
          },
        });

        const { firstName, lastName } = res.data;
        const fullName = `${firstName} ${lastName}`.trim();
        setUsername(fullName);
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    getUsername();
  }, []);

  useEffect(() => {
    const fetchTickets = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/tickets/getallTickets`, {
          headers: {
            Authorization: token,
          },
        });

        const fetchedTickets = res.data.tickets;
        setAllTickets(fetchedTickets);

        // ✅ Set the first ticket by default
        if (fetchedTickets.length > 0) {
          setSelectedTicket(fetchedTickets[0]);
        }
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, []);

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
  };

  return (
    <div className='contactCenter'>
      <div className='query-list'>
        <p>Contact Center</p>
        <div className='chat_y'><p>Chats</p></div>
        <div className='chats'>
          {allTickets.map((ticket) => (
            <div
              className='chat'
              key={ticket._id}
              onClick={() => handleTicketClick(ticket)}
              style={{
                backgroundColor: selectedTicket?._id === ticket._id ? '#EFEFEF' : 'transparent',
                cursor: 'pointer',
              }}
            >
              <img src={People} alt="People" />
              <div className='details_cc'>
                <p style={{ color: '#5E9BD5', fontWeight: '600' }}>{ticket.userDetails?.name || 'Unknown User'}</p>
                <p style={{ color: '#6A6B70', fontSize: '12px' }}>{ticket.initialMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='chat-section'>
        <div className='header_c'>
          <p>{selectedTicket ? `Ticket#${selectedTicket.ticketNo}` : 'Select a ticket'}</p>
          <House size={16} style={{ color: '#6A6B70' }} />
        </div>

        <div className='chat-box'>
          {selectedTicket ? (
            selectedTicket.messages.map((message, index) => {
              const isUser = message.sender === 'user';
              return (
                <div
                  className={`message ${isUser ? 'left' : 'right'}`}
                  key={index}
                >
                  <p>
                    {isUser ? selectedTicket.userDetails?.name : username}: {message.text}
                  </p>
                </div>
              );
            })
          ) : (
            <p>Select a ticket to view messages</p>
          )}
        </div>

        <div className='input-field'>
          <textarea placeholder='Type here...' rows="4" />
          <div className='send'><MdSend size={16} style={{ color: '#D1D6DA' }} /></div>
        </div>
      </div>

      <div className='query-details'>
        {selectedTicket ? (
          <>
            <div className='top'>
              <img src={People} alt="People" />
              <p>{selectedTicket.userDetails?.name}</p>
            </div>
            <div className='details_c'>
              <p>Details</p>
              <p><SquareUserRound size={16} color='#808080' /> {selectedTicket.userDetails?.name}</p>
              <p><Phone size={16} color='#808080' /> {selectedTicket.userDetails?.phone || 'N/A'}</p>
              <p><Mail size={16} color='#808080' /> {selectedTicket.userDetails?.email || 'N/A'}</p>
            </div>
            <div className='members'>
              <p>Teamments</p>
              <p>Coming soon...</p>
            </div>
            <div className='tic_status'>
              {/* Add ticket status or tags here */}
            </div>
          </>
        ) : (
          <p>Select a ticket to see details</p>
        )}
      </div>
    </div>
  );
}
