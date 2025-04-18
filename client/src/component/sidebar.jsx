import React from 'react'
import logo_1 from '../assets/logo_1.png'
import { NavLink, useNavigate } from 'react-router-dom'
import { CircleUserRound, House, MessageSquareText, ChartNoAxesColumn, Bot,Settings } from 'lucide-react';

export default function sidebar() {
  const navigate = useNavigate();

  return (
    <div className='sidebar'>
        <div className='logo'><img src={logo_1} alt="Logo" /></div>
        <div className='menu'>
            <NavLink to="/home1"><House/>Dashboard</NavLink>
            <NavLink to="/contactCenter"><MessageSquareText />Contact Center</NavLink>
            <NavLink to="/analytics"><ChartNoAxesColumn />Analytics</NavLink>
            <NavLink to="/chatbot"><Bot />Chat Bot</NavLink>
            <NavLink to="/team">Team</NavLink>
            <NavLink to="/settings"><Settings />Settings</NavLink>  
        </div>
        <div className='profileIcon'><CircleUserRound /></div>
    </div>
  )
}
