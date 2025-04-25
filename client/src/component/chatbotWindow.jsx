import React, { useState } from 'react'
import {Phone, Send} from 'lucide-react';
import Ellipse from "../assets/Ellipse 6.png"




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

    console.log(chatbotStyle)
    const handleconversation = () =>{
        if (!inputMessage.trim()) return;
        setConversationStarted(true)
        if(messages.length === 0 && !initialMessage.text){
            setInitialMessage({text:inputMessage})
        }
        if(initialMessage.text && userCreated){
            setMessages([...messages,{sender:"user", text:inputMessage} ])
        }
        setInputMessage("");
    }
    console.log(messages)
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (details.name && details.phone && details.email) {
            // After the user fills out the form, update the state to reflect that the user is created
            setUserCreated(true);
        }
    };
  return (
    <div className='chat-bot'>
        <div className='header-chat' style={{backgroundColor:chatbotStyle.headerColor}}>
          <img className='ell' src={Ellipse} alt="" />
          <p>Hubly</p>
        </div>
        <div className='msg-chat' style={{backgroundColor:chatbotStyle.backgroundColor}}>

            {!conversationStarted && <p className='covr'>Start a conversion</p>}
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
                    <p key={index}
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
