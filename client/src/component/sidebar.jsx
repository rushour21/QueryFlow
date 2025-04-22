import React, { useEffect, useState } from 'react'
import logo_1 from '../assets/logo_1.png'
import { NavLink, useNavigate } from 'react-router-dom'
import { CircleUserRound, House, MessageSquareText, ChartNoAxesColumn, Bot,Settings, LogOut  } from 'lucide-react';
import { FaUsers } from "react-icons/fa6";
import '../styles/sidebar.css'
import axios from 'axios';

export default function sidebar() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [logout, setLogout] = useState(false)
  console.log(username);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const getusername = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/getusername`, {
          headers: {
            Authorization: token
          }
        });
    
        const { firstName, lastName } = res.data;
    
        // Combine first and last name, handle missing values
        const fullName = `${firstName} ${lastName}`.trim();    
        setUsername(fullName);
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };
    getusername();
    }, []);

  return (
    <div className='sidebar'>
        <img className='logo' src={logo_1} alt="Logo" />
        <div className='menu'>
          <NavLink to="home1">
            {({ isActive }) => (
              <div className='item'>
                <House size={18} />
                {isActive && <p>Dashboard</p>}
              </div>
            )}
          </NavLink>

          <NavLink to="contact-center">
            {({ isActive }) => (
              <div className='item'>
                <MessageSquareText size={18} />
                {isActive && <p>Contact Center</p>}
              </div>
            )}
          </NavLink>

          <NavLink to="analytics">
            {({ isActive }) => (
              <div className='item'>
                <ChartNoAxesColumn size={18} />
                {isActive && <p>Analytics</p>}
              </div>
            )}
          </NavLink>

          <NavLink to="chatbot">
            {({ isActive }) => (
              <div className='item'>
                <Bot size={18} />
                {isActive && <p>Chat Bot</p>}
              </div>
            )}
          </NavLink>

          <NavLink to="team">
            {({ isActive }) => (
              <div className='item'>
                <FaUsers size={18} />
                {isActive && <p>Team</p>}
              </div>
            )}
          </NavLink>

          <NavLink to="settings">
            {({ isActive }) => (
              <div className='item'>
                <Settings size={18} />
                {isActive && <p>Settings</p>}
              </div>
            )}
          </NavLink>
        </div>

        <div onClick={() => setLogout(!logout)} className='profileIcon'><CircleUserRound color='#424242'/></div>
        {logout && (<button onClick={() => {
            localStorage.removeItem("authToken"); // Remove token
            navigate('/login'); // Redirect to home page
        }} className='log-out'><LogOut size={13} /> Sign out</button>)}

    </div>
  )
}
