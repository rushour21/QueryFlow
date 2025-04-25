import React, { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { PiShoppingBagBold   } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
import "../styles/home1.css"
import axios from 'axios';

export default function home1() {
  const [searchQuery, setSearchQuery] = useState('');
 
  return (
    <div className='dashboard'>
      <div className='dash-header'>
        <h2>Dashboard</h2>
        <div className='searchbar'>
          <CiSearch size={25}/>
          <input 
            type="text" 
            placeholder="Search for ticket" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>      
      <div className='dash-content'>
        <div className='tickets'>
        <NavLink to="allTickets">
          {({ isActive }) => (
            <div className={isActive ? 'active_t' : 'ticket-link'}>
              {isActive && <PiShoppingBagBold size={16} />}
              <span>All Tickets</span>
            </div>
          )}
        </NavLink>

        <NavLink to="resolved">
          {({ isActive }) => (
            <div className={isActive ? 'active_t' : 'ticket-link'}>
              {isActive && <PiShoppingBagBold size={16} />}
              <span>Resolved</span>
            </div>
          )}
        </NavLink>

        <NavLink to="unresolved">
          {({ isActive }) => (
            <div className={isActive ? 'active_t' : 'ticket-link'}>
              {isActive && <PiShoppingBagBold size={16} />}
              <span className='tagname'>Unresolved</span>
            </div>
          )}
        </NavLink>

        </div>
        <div className='ticket_list'>
          <Outlet context={{ searchQuery }}/>
        </div>
      </div>
    </div>
  )
}
