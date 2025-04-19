import React from 'react'
import logo_1 from '../assets/logo_1.png'
import { NavLink, useNavigate } from 'react-router-dom'
import { CircleUserRound, House, MessageSquareText, ChartNoAxesColumn, Bot,Settings } from 'lucide-react';
import { FaUsers } from "react-icons/fa6";
import '../styles/sidebar.css'

export default function sidebar() {
  const navigate = useNavigate();

  return (
    <div className='sidebar'>
        <img className='logo' src={logo_1} alt="Logo" />
        <div className='menu'>
          <NavLink to="home1">
            {({ isActive }) => (
              <div className='item'>
                <House size={16} />
                {isActive && <p>Dashboard</p>}
              </div>
            )}
          </NavLink>

          <NavLink to="contact-center">
            {({ isActive }) => (
              <div className='item'>
                <MessageSquareText size={16} />
                {isActive && <p>Contact Center</p>}
              </div>
            )}
          </NavLink>

          <NavLink to="analytics">
            {({ isActive }) => (
              <div className='item'>
                <ChartNoAxesColumn size={16} />
                {isActive && <p>Analytics</p>}
              </div>
            )}
          </NavLink>

          <NavLink to="chatbot">
            {({ isActive }) => (
              <div className='item'>
                <Bot size={16} />
                {isActive && <p>Chat Bot</p>}
              </div>
            )}
          </NavLink>

          <NavLink to="team">
            {({ isActive }) => (
              <div className='item'>
                <FaUsers size={16} />
                {isActive && <p>Team</p>}
              </div>
            )}
          </NavLink>

          <NavLink to="settings">
            {({ isActive }) => (
              <div className='item'>
                <Settings size={16} />
                {isActive && <p>Settings</p>}
              </div>
            )}
          </NavLink>
        </div>

        <div className='profileIcon'><CircleUserRound color='#424242'/></div>
    </div>
  )
}
