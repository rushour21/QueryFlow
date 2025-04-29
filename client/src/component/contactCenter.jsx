import React, { useState, useEffect } from 'react';
import People from '../assets/People.png';
import axios from 'axios';
import { House, SquareUserRound, Phone, Mail, ChevronDown, ChevronUp, Ticket } from 'lucide-react';
import icon2 from '../assets/image.png';
import { MdSend } from 'react-icons/md';

import '../styles/contactCenter.css';

export default function ContactCenter() {
  const [user, setUser] = useState('');
  const [allTickets, setAllTickets] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [inputMsg, setInputMsg] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [desiredStatus, setDesiredStatus] = useState(""); 
   const [assignMemberPopup, setAssignMemberPopup] = useState(false);
   const [assigningMember, setAssigningMember]= useState("")

  const [isOpen, setIsOpen] = useState({
    team: false,
    status: false,
  });

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const getUser = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/getuser`, {
          headers: { Authorization: token },
        });

        setUser(res.data.user);
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    const fetchTickets = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;
  
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/tickets/getallTickets`, {
          headers: { Authorization: token },
        });
  
        const fetchedTickets = res.data.tickets;
  
        if (user.designation === 'admin') {
          // If Admin, show all tickets
          setAllTickets(fetchedTickets);
          if (fetchedTickets.length > 0) setSelectedTicket(fetchedTickets[0]);
        } else {
          // If Member, show only assigned tickets
          const assignedTickets = fetchedTickets.filter(ticket => ticket.assignedTo === user._id);
          setAllTickets(assignedTickets);
          if (assignedTickets.length > 0) setSelectedTicket(assignedTickets[0]);
        }
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };
  
    // Fetch tickets only after user is loaded
    if (user) {
      fetchTickets();
    }
  }, [user]); // <== Dependency added here
  

    useEffect(() => {
      const fetchmembers = async () => {
        const token = localStorage.getItem("authToken");
        if (!token) return;
  
        try {
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/members/addedmembers`, {
            headers: { Authorization: token },
          });
  
          const fetchedMembers = res.data.members;
          setMembers(fetchedMembers);
        } catch (error) {
          console.error("Error fetching members:", error);
        }
      };
  
      fetchmembers();
    }, []);
  

    const handleTicketClick = (ticket) => {
      setSelectedTicket(ticket);
    };
    console.log(selectedTicket)
    const handleSendMessage = async () => {
      if (!inputMsg.trim() || !selectedTicket) return;
      const updatedTicket = {
        ...selectedTicket,
        messages: [...(selectedTicket.messages || []), { sender: "admin", text: inputMsg }]
      };
      setSelectedTicket(updatedTicket);
      try {
          const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/tickets/adminmessage/${selectedTicket._id}`,{
          message: inputMsg
              })
      }
      catch (error) {
         console.log("can't save messages ", error)
      }
      setInputMsg('');
    };
    const handleStatusClick = (status) => {
      setDesiredStatus(status);
      setShowPopup(true);
    };

    const handleConfirmStatus = async () => {
      if (!selectedTicket || !desiredStatus) return;
    
      try {
        const token = localStorage.getItem("authToken");
        await axios.put(`${import.meta.env.VITE_API_URL}/api/tickets/status/${selectedTicket._id}`, {
          status: desiredStatus,
        }, {
          headers: { Authorization: token },
        });
    
        // Update local ticket state
        setSelectedTicket(prev => ({
          ...prev,
          status: desiredStatus,
        }));
    
        setShowPopup(false);
        setIsOpen(prev => ({ ...prev, status: false })); // Close the dropdown too
      } catch (error) {
        console.error("Error updating ticket status:", error);
      }
    };
    const handleMemberClick= (memberId) =>{
      setAssignMemberPopup(true);
      setAssigningMember(memberId)
      
    }

    const handleAssignMember = async() => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/tickets/assign/${selectedTicket._id}`, {
          assigningMember,
        }, {
          headers: { Authorization: token },
        });
        if (response.status === 200){ alert("assigned")}
      } catch (error) {
        console.error("Error in assigning ticket:", error);
      }
      setAssignMemberPopup(false);
    }
  return (
    <div className='contactCenter'>
      <div className='query-list'>
        <p>Contact Center</p>
        <div className='chat_y'><p>Chats</p></div>
        <div className='chats'>
          {allTickets.map((ticket, index) => (
            <div
              className='chat'
              key={index}
              onClick={() => handleTicketClick(ticket)}
              style={{
              backgroundColor: selectedTicket?._id === ticket._id ? '#EFEFEF' : 'transparent',
              cursor: 'pointer'}}>
               <img src={People} alt="People" />
                <div className='details_cc'>
                  <p style={{ color: '#5E9BD5', fontWeight: '600' }}>{ticket.userDetails?.name || 'Unknown User'}</p>
                  <p style={{ color: '#6A6B70', fontSize: '12px' }}>{typeof ticket.initialMessage.text === 'string' ? ticket.initialMessage.text : 'No message'}</p>
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
        <div className='hr-div'>
          <div className='tic-time'>
            <hr className="flex-hr" />
            <p className="ticket-time">
              {new Date(selectedTicket?.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            <hr className="flex-hr" />
          </div>
        </div>
        {selectedTicket && selectedTicket.status === "Pending" && selectedTicket.assignedTo === user._id && <><div className='chat-box'>
          <div className="chat-msg-cc">
            <img src={People} alt="People"  style={{width:"30px", height:"30px"}} />
            <div style={{marginRight: selectedTicket?.initialMessage.sender === "user" ? "auto" : "5px"
                  , marginLeft:selectedTicket?.initialMessage.sender === "user" ?"5px" : "auto"}}>
              <p className='u-name'>{selectedTicket?.userDetails?.name || 'Unknown User'}</p>
              <p className='u-text'>{selectedTicket?.initialMessage.text}</p>
            </div>
          </div>
          
          {selectedTicket?.messages?.map((message, index) => {
            const isUser = message.sender === 'user';
            return (
              <div
                className="chat-msg-cc"
                key={index}
                style={{marginRight: message.sender === "user" ? "auto" : "5px"
                  , marginLeft:message.sender === "user" ?"5px" : "auto",
                  flexDirection: message.sender === "user" ? "row" : "row-reverse", }}
              >
                 <img src={People} alt="People"  style={{width:"30px", height:"30px"}} />
                <div>
                <p className='u-name' style={{ textAlign: message.sender === "user" ? "left" : "right" }}>{isUser ? selectedTicket.userDetails?.name || 'User' : user.firstName || user.userName }</p>
                <p className='u-text' style={{textAlign:message.sender === "user" ? "left" : "right"}}>{message.text}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className='input-field'>
          <textarea 
            placeholder='Type here...' 
            rows="4" 
            onChange={(e) => setInputMsg(e.target.value)}
            value={inputMsg}
          />
          <div className='send' onClick={handleSendMessage} >
            <MdSend size={16}/>
          </div>
        </div></>}
        
         {(selectedTicket && selectedTicket.status === "Resolved" && selectedTicket.assignedTo === user._id) && <p >This chat has been resolved </p>}
         {(selectedTicket && selectedTicket.status === "Unresolved" && selectedTicket.assignedTo === user._id) && <p >This chat has been unresolved </p>}
          {(selectedTicket && selectedTicket.assignedTo !== user._id)&&<p>This chat is assigned to new team member. you no longer have access </p>}
      
      </div>

      <div className='query-details'>
        {selectedTicket && (
         <>
          <div className='top'>
            <img src={People} alt="People" />
            <p>{selectedTicket.userDetails?.name || 'Unknown User'}</p>
          </div>
          <div className='details_c'>
            <p className='det_1'>Details</p>
            <p className='det_11'><SquareUserRound size={16} color='#808080' /> {selectedTicket.userDetails?.name || 'N/A'}</p>
            <p className='det_11'><Phone size={16} color='#808080' /> {selectedTicket.userDetails?.phone || 'N/A'}</p>
            <p className='det_11'><Mail size={16} color='#808080' /> {selectedTicket.userDetails?.email || 'N/A'}</p>
          </div>
          <div className='members'>
            <p className='det_1'>Teamments</p>
            <div onClick={() => setIsOpen(prev => ({ ...prev, team: !prev.team }))} className='dropdown-toggle'>
              <span><img src={icon2} alt="" />{user.firstName || user.userName}</span> {isOpen.team ? <ChevronUp /> : <ChevronDown />}
            </div>
            {isOpen.team && (
              <>
                {members.map((member, index) => (
                  <div className='member_q' key={index} onClick={() => handleMemberClick(member._id)}>
                    <img src={icon2} alt="" />{member.userName || 'Unknown'}
                  </div>
                ))}
                {assignMemberPopup && selectedTicket.assignedTo === user._id && user.designation === "admin" && selectedTicket?.status === "Pending" && (
                  <div className='popup'>
                    <p>Chat would be assigned to Different team member </p>
                    <div className='popup-buttons'>
                      <button style={{backgroundColor:"#aeaeae"}} onClick={() => setAssignMemberPopup(false)}>Cancel</button>
                      {/* You can create a separate confirm function for member assignment */}
                      <button style={{backgroundColor:"#184E7F"}} onClick={handleAssignMember}>Confirm</button>
                    </div>
                  </div>
                )}
              </>
            )}

          </div>
          <div className='tic_status'>
            <div onClick={() => setIsOpen(prev => ({ ...prev, status: !prev.status }))} className='dropdown-toggle'>
              <span><Ticket />Ticket Status</span> {isOpen.status ? <ChevronUp /> : <ChevronDown />}
            </div>
            {isOpen.status && selectedTicket.assignedTo === user._id && (
              <div className='dropdown-options'>
                <div className='option' onClick={() => handleStatusClick('Resolved')}>Resolved</div>
                <div className='option'onClick={() => handleStatusClick('Unresolved')}>Unresolved</div>
              </div>)
              }
            {showPopup &&  selectedTicket.status === "Pending" && <div className='popup'>
              <p>Chat will be closed</p>
              <div className='popup-buttons'>
                <button style={{backgroundColor:"#aeaeae"}} onClick={() => setShowPopup(false)}>Cancel</button>
                <button style={{backgroundColor:"#184E7F"}} onClick={handleConfirmStatus}>Confirm</button>
              </div>
            </div>}
          </div>
        </>)}
      </div>
    </div>
  );
}