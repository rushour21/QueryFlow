import React, {useEffect, useRef, useState}from 'react'
import { Pencil, Send } from 'lucide-react';
import Ellipse from "../assets/Ellipse 6.png"
import axios from 'axios';


import '../styles/chatbot.css'


export default function Chatbot() {
  const [chatbotStyle, setChatbotStyle] = useState({
    headerColor: '#33475B',
    backgroundColor: '#FAFBFC',
    customizedText: ['How can i help you?', 'Ask me anything!'],
    introFields: {
      yourName: 'Your name',
      yourEmail: '+1(000)000-0000',
      yourPhone: 'example@gmail.com'
    },
    welcomeText: '👋 Want to chat about Hubly? I\'m a chatbot here to help you find your way.',
    chatTimer: "1"
  })

  useEffect (() => {
      const fetchstyle = async ()=> {
          try {
            const response = await axios.get(`${import.meta.VITE_API_URL}/api/chatbot/getstyle`,)
            setChatbotStyle(response.data.style)
            console.log(response.data.style)
          } catch (error) {
          }
      }
      fetchstyle();
  },[])

  const isFirstRender = useRef(true);
  const debounceTimeout = useRef(null);

  

  // Debounced input handler
  const wordLimit = 50;  
  const handleChange = (e) => {
    const input = e.target.value;
    const words = input.trim().split(/\s+/);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current); // Clear the previous timeout
    }

    debounceTimeout.current = setTimeout(() => {
      if (words.length <= wordLimit) {
        setChatbotStyle((prevState) => ({
          ...prevState,
          welcomeText: input
        }));
      } else {
        const trimmed = words.slice(0, wordLimit).join(" ");
        setChatbotStyle((prevState) => ({
          ...prevState,
          welcomeText: trimmed
        }));
      }
    }, 200); // Debounced delay (500ms)
  };
  const wordCount = chatbotStyle.welcomeText.trim().split(/\s+/).filter(word => word).length;
  
  return (
    <div className='chatbot-sec'>
      <div className='chatbot-dis'>
        <p>Chat Bot</p>
        <div className='chatbot-box'>
          <div className='header-c'>
            <img src={Ellipse} alt="" />
            <p>Hubly</p>
          </div>
          <div className='msg-con'>
            <div className='msg1'>
              <img src={Ellipse} alt="" />
              <p></p>
            </div>
            <div className='msg2'>
              <p></p>
            </div>
            <div className='msg3'>
              <p>Introduction Yourself</p>
                                <p>Your Name</p>
                                <p>{chatbotStyle.introFields.yourName}</p>
                                <p>Your Phone</p>
                                <p>{chatbotStyle.introFields.yourPhone}</p>
                                <p>Your Email</p>
                                <p>{chatbotStyle.introFields.yourEmail}</p>
                                <p>Thank You!</p>
            </div>
          </div>
          <div className='footer-c'>
            <p></p>
            <Send/>
          </div>
        </div>
        <div>
          <img src={Ellipse} alt="" />
          <p></p>

        </div>
      </div>
      <div className='box-styles'>
        <div className='header style-box'>
          <p>Header color</p>
          <div className='colors'>
            <div className='color-box' style={{ backgroundColor: '#ffffff' }}></div>
            <div className='color-box' style={{ backgroundColor: '#000000' }}></div>
            <div className='color-box' style={{ backgroundColor: '#33475B' }}></div>
          </div>
          <div className='box-inpt'>
            <div className='color-box1' style={{ backgroundColor: '#F9F9F9' }}></div>
            <input className='inpt-1' type="text" value={chatbotStyle.headerColor || ""} />
          </div>
        </div>
        <div className='background style-box'>
          <p>Custom Background Color</p>
          <div className='colors'>
            <div className='color-box' style={{ backgroundColor: '#ffffff' }}></div>
            <div className='color-box' style={{ backgroundColor: '#000000' }}></div>
            <div className='color-box' style={{ backgroundColor: '#FAFBFC' }}></div>
          </div>
          <div className='box-inpt'>
            <div className='color-box1' style={{ backgroundColor: '#F9F9F9' }}></div>
            <input className='inpt-1' type="text" value={chatbotStyle.backgroundColor || ""} />
          </div>
        </div>
        <div className='chat-mesg-1 style-box'>
          <p>Customize Message</p>
            <div className='inpt-icon'><input className='inpt-1' type="text" defaultValue={chatbotStyle.customizedText[0] || ""} /><Pencil size={13}/></div>
            <div className='inpt-icon'><input className='inpt-1' type="text" defaultValue={chatbotStyle.customizedText[1] || ""} /><Pencil size={13}/></div>
        </div>
        <form action="" className='intro-form style-box'>
          <p>Introduction Form</p>
          <label htmlFor="name">Your name</label>
          <input className='inp21' type="text" id="name" defaultValue={chatbotStyle.introFields.yourName || ""} />  {/* Corrected id from "naem" to "name" */}
          <label htmlFor="phone">Your phone</label>  {/* Added label text for phone */}
          <input className='inp21' type="text" id="phone" defaultValue={chatbotStyle.introFields.yourPhone || ""} />  {/* Added input for phone */}
          <label htmlFor="email">Your email</label>  {/* Added label text for email */}
          <input className='inp21' type="text" id="email" defaultValue={chatbotStyle.introFields.yourEmail || ""} />  {/* Added input for email */}
          <button type="submit">Thank You!</button>  {/* Added submit button */}
        </form>
        <div className='wel-msg style-box'>
          <p>Welcome Message</p>
          <textarea
            id="welcomeMessage"
            rows="3"
            value={chatbotStyle.welcomeText || ""}
            onChange={handleChange}
          />
          <div className='word-count' style={{ textAlign: 'right', fontSize: '12px', color: wordCount >= wordLimit ? 'red' : 'gray' }}>
            {wordCount}/{wordLimit}
          </div>
          {wordCount >= wordLimit && (
            <div className='war-1' style={{ color: 'red', fontSize: '12px', textAlign: 'right' }}>
              Word limit reached!
            </div>
          )}
          <div className='pen-1'><Pencil size={13} /></div>
        </div>


        <div className="time-picker-container">
          
        </div>
      </div>
    </div>
  )
}
