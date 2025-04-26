import React, { useEffect, useRef, useState } from 'react'
import {Phone, Send} from 'lucide-react';
import Ellipse from "../assets/Ellipse 6.png"
import axios from 'axios';


export default function chatbotWindow({chatbotStyle}) {
    const [conversationStarted, setConversationStarted] = useState(false);
    const [inputMessage, setInputMessage] = useState('');
    const [initialMessage,  setInitialMessage] = useState({
        sender: "user",
        text:""
    })
    const [messages, setMessages] = useState([]);
    const [userCreated, setUserCreated] = useState(false); // New state to track if user is created
    const [showForm, setShowForm] = useState(false);
    const [details, setDetails] = useState({
        name: "",
        phone: "",
        email:""
    })
    console.log(details)

    useEffect(() => {
        console.log("useEffect ran");
        const fetchdetails = async () => {
            const ticketId = localStorage.getItem("ticketId");
            console.log("ticketId fetched:", ticketId);
            if (!ticketId) return; // Exit early if no ticketId
    
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/tickets/allchats/${ticketId}`);
                console.log("Response from API:", response.data);
                if (response.status === 200) {
                    // Handle the response
                    console.log("Fetched messages:", response.data);
                    const res = response.data.allChats
                    console.log(res)
                    setInitialMessage(res.initialMessage)
                    setDetails(res.userDetails)
                    setMessages(res.messages)
                    setUserCreated(true)
                }
            } catch (error) {
                console.log("Error during API call:", error);
            }
        };
        fetchdetails();
    }, []);
    

    console.log(chatbotStyle)
    const handleconversation =  async () =>{
        if (!inputMessage.trim()) return;
        setConversationStarted(true)
        if(messages.length === 0 && !initialMessage.text){
            setInitialMessage({...initialMessage,text:inputMessage})
        }
        if(initialMessage.text && userCreated){
            setMessages([...messages,{sender:"user", text:inputMessage} ])
            try {
                const ticketId = localStorage.getItem("ticketId")
                const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/tickets/usermessage/${ticketId}`,{
                    message: inputMessage
                })
            } catch (error) {
                console.log("can't save messages ", error)
            }
        }
        setInputMessage("");
    }
    console.log(messages)
    
    const handleFormSubmit = async(e) => {
        e.preventDefault();
        if (details.name && details.phone && details.email && !userCreated) {
            try {
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/tickets/create/`,{
                    details,
                    initialMessage
                })
                if(response.status === 201){
                    const ticketId = response.data.ticket;
                    localStorage.setItem("ticketId", ticketId);
                    console.log("user:", response.data)
                    alert('ticket created')
                 };
            } catch (error) {
                console.error("Error creating ticket:", error);
                alert("Failed to create ticket. Please try again later.");
            }
            // After the user fills out the form, update the state to reflect that the user is created
            setUserCreated(true);
        }
    };

    const msgChatRef = useRef(null);

    useEffect(() => {
        if (msgChatRef.current) {
            msgChatRef.current.scrollTop = msgChatRef.current.scrollHeight;
        }
        msgChatRef.current.scrollTo({
            top: msgChatRef.current.scrollHeight,
            behavior: "smooth"
        });
        
    }, [messages, initialMessage]);

    
  return (
    <div className='chat-bot'>
        <div className='header-chat' style={{backgroundColor:chatbotStyle.headerColor}}>
          <img className='ell' src={Ellipse} alt="" />
          <p>Hubly</p>
        </div>
        <div className='msg-chat' style={{backgroundColor:chatbotStyle.backgroundColor}} ref={msgChatRef}>

            {!conversationStarted && !initialMessage.text && <p className='covr'>Start a conversion</p>}
            {initialMessage.text &&<p className='initial'>{initialMessage.text}</p>}
            {initialMessage.text &&<form className='chat-form' onSubmit={handleFormSubmit}>
                <p>Introduction Form</p>

                <label htmlFor="name">Your name</label>
                <input 
                    className='form-inp' 
                    type="text" 
                    id="name" 
                    value={details.name}
                    onChange={(e) => setDetails({ ...details, name: e.target.value })}
                    placeholder={chatbotStyle.introFields.yourName}
                />  

                <label htmlFor="phone">Your phone</label> 
                <input 
                    className='form-inp' 
                    type="text" 
                    id="phone" 
                    value={details.phone}
                    onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                    placeholder={chatbotStyle.introFields.yourPhone}
                /> 

                <label htmlFor="email">Your email</label>
                <input 
                    className='form-inp' 
                    type="text" 
                    id="email"
                    value={details.email} 
                    onChange={(e) => setDetails({ ...details, email: e.target.value })}
                    placeholder={chatbotStyle.introFields.yourEmail}
                />  

                <button className='ty-1' style={{backgroundColor: userCreated ? "#848484" : "#184E7F"}}>Thank You!</button>
            </form>}
            {userCreated && <p className='custom'>{chatbotStyle.customizedText.first}</p>}
            {userCreated && <p className='custom'>{chatbotStyle.customizedText.second}</p>}

            {messages.length >0 && initialMessage.text &&
                messages.map((message, index) => (
                    <p className='userMsg' key={index}
                    style={{marginRight: message.sender === "user" ? "5px" : "auto"
                            , marginLeft:message.sender === "user" ?"auto" : "5px"}}
                    >{message.text}</p>
                ))
            }
        </div>
        <div className='footer-chat'>
            <textarea value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)} 
                placeholder='Write a message'>
            </textarea>
            <div onClick={handleconversation} className='send'><Send size={18}/></div>
        </div>
      </div>
  )
}
