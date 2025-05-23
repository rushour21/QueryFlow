import React, {useEffect, useRef, useState}from 'react'
import { Pencil, Send,X } from 'lucide-react';
import Ellipse from "../assets/Ellipse 6.png"
import axios from 'axios';

import '../styles/chatbot.css'

export default function chatbot() {
  const [chatbotStyle, setChatbotStyle] = useState({
      headerColor: '#33475B',
      backgroundColor: '#e8a088',
      customizedText: {
        first:"How can i help you?",
        second:"Ask me anything!"
      },
      introFields: {
        yourName: 'Your name',
        yourEmail: '+1 (000) 000-0000',
        yourPhone: 'example@gmail.com'
      },
      welcomeText: "👋 Want to chat about Hubly? I'm an chatbot here to help you find your way.",
      chatTimer: "1"
    })
  const [editable, setEditable] = useState({
    input1: false,
    input2: false,
    textarea:false
  })

  useEffect (() => {
    const fetchstyle = async ()=> {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/chatbot/getstyle`,)
          setChatbotStyle(response.data.style);
          console.log(response.data.style);
        } catch (error) {
          console.error("Error fetching style:", error);
        }
    }
    fetchstyle();
  },[])

  const isFirstRender = useRef(true);
  // Separate refs for different debounce timers
  const styleUpdateTimeout = useRef(null);
  const welcomeMessageTimeout = useRef(null);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
  
    if (styleUpdateTimeout.current) {
      clearTimeout(styleUpdateTimeout.current);
    }
  
    styleUpdateTimeout.current = setTimeout(async () => {
      try {
        const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/chatbot/style`, {
          chatbotStyle,
        });
        console.log("Style updated successfully:", response.data);
      } catch (error) {
        console.error("Error updating style:", error);
      }
    }, 500); // 500ms debounce
    
    return () => {
      if (styleUpdateTimeout.current) {
        clearTimeout(styleUpdateTimeout.current);
      }
    };
  }, [chatbotStyle]);
  
  console.log(chatbotStyle)
 
  // Debounced input handler for welcome message
  const wordLimit = 50;  
  const handleChange = (e) => {
    const input = e.target.value;
    const words = input.trim().split(/\s+/);

    if (welcomeMessageTimeout.current) {
      clearTimeout(welcomeMessageTimeout.current); // Clear the previous timeout
    }

    welcomeMessageTimeout.current = setTimeout(() => {
      if (words.length <= wordLimit) {
        setChatbotStyle(prevState => ({
          ...prevState,
          welcomeText: input
        }));
      } else {
        const trimmed = words.slice(0, wordLimit).join(" ");
        setChatbotStyle(prevState => ({
          ...prevState,
          welcomeText: trimmed
        }));
      }
    }, 200); // Debounced delay (200ms)
  };
  
  const wordCount = chatbotStyle.welcomeText.trim().split(/\s+/).filter(word => word).length;

  return (
    <div className='chatbot-sec'>
          <div className='chatbot-dis'>
            <p>Chat Bot</p>
            <div className='chatbot-box'>
              <div className='header-c' style={{backgroundColor:chatbotStyle.headerColor}}>
                <img className='ell' src={Ellipse} alt="" />
                <p>Hubly</p>
              </div>
              <div className='msg-con' style={{backgroundColor:chatbotStyle.backgroundColor}}>
                <div className='msg1'>
                  <img className='ell' src={Ellipse} alt="" />
                  <p>{chatbotStyle.customizedText.first}</p>
                </div>
                <div className='msg2'>
                  <p>{chatbotStyle.customizedText.second}</p>
                </div>
                <div className='msg3'>
                  <p className='titl'>Introduction Yourself</p>
                  <p className='titl1'> Your Name</p>
                  <p className='titl'>{chatbotStyle.introFields.yourName}</p>
                  <p className='titl1'>Your Phone</p>
                  <p className='titl'>{chatbotStyle.introFields.yourPhone}</p>
                  <p className='titl1'>Your Email</p>
                  <p className='titl'>{chatbotStyle.introFields.yourEmail}</p>
                  <p className='titl1'>Thank You!</p>
                </div>
              </div>
              <div className='footer-c'>
                <p>Write a message</p>
                <div className='send'><Send size={18}/></div>
              </div>
            </div>
            <div className='popup-c'>
              <img src={Ellipse} alt="" />
              <div className='popup-con'>
                <p>{chatbotStyle.welcomeText}</p>
                <div className='cls'><X size={15}/></div>
              </div>
            </div>
          </div>
          <div className='box-styles'>
            <div className='header style-box'>
              <p>Header color</p>
              <div className='colors'>
                <div onClick={() => setChatbotStyle(prev => ({ ...prev, headerColor: '#424242' }))} 
                className='color-box' style={{ backgroundColor: '#424242' }}></div>
                <div onClick={() => setChatbotStyle(prev => ({ ...prev, headerColor: '#000000' }))}
                className='color-box' style={{ backgroundColor: '#000000' }}></div>
                <div onClick={() =>setChatbotStyle(prev => ({ ...prev, headerColor: '#33475B' }))}
                 className='color-box' style={{ backgroundColor: '#33475B' }}></div>
              </div>
              <div className='box-inpt'>
                <div className='color-box1' style={{ backgroundColor: chatbotStyle.headerColor }}></div>
                <input 
                  className='inpt-1' 
                  type="text" 
                  Value={chatbotStyle.headerColor || ""} 
                  disabled
                />
              </div>
            </div>
            <div className='background style-box'>
              <p>Custom Background Color</p>
              <div className='colors'>
                <div onClick={() => setChatbotStyle(prev => ({ ...prev, backgroundColor: '#69b1a8' }))} 
                className='color-box' style={{ backgroundColor: '#69b1a8' }}></div>
                <div onClick={() => setChatbotStyle(prev => ({ ...prev, backgroundColor: '#e8a088' }))}
                className='color-box' style={{ backgroundColor: '#e8a088' }}></div>
                <div onClick={() => setChatbotStyle(prev => ({ ...prev, backgroundColor: '#EEEEEE' }))}
                 className='color-box' style={{ backgroundColor: '#EEEEEE' }}></div>
              </div>
              <div className='box-inpt'>
                <div className='color-box1' style={{ backgroundColor: chatbotStyle.backgroundColor }}></div>
                <input 
                  className='inpt-1' 
                  type="text" 
                  Value={chatbotStyle.backgroundColor || "" } 
                  disabled
                />
              </div>
            </div>
            <div className='chat-mesg-1 style-box'>
              <p>Customize Message</p>
                <div className='inpt-icon'>
                  <input className='inpt-1' type="text" 
                  disabled={!editable.input1} 
                  value={chatbotStyle.customizedText.first || ""}
                  onChange={(e) =>
                    setChatbotStyle(prev => ({
                      ...prev,
                      customizedText: {
                        ...prev.customizedText,
                        first: e.target.value
                      }
                    }))
                  }/>
                  <Pencil onClick={() => setEditable(prev => ({ ...prev, input1: !prev.input1 }))} size={13} />
                </div>
                <div className='inpt-icon'>
                  <input className='inpt-1' type="text" 
                  disabled={!editable.input2} 
                  value={chatbotStyle.customizedText.second || ""} 
                  onChange={(e) =>
                    setChatbotStyle(prev => ({
                      ...prev,
                      customizedText: {
                        ...prev.customizedText,
                        second: e.target.value
                      }
                    }))
                  }/>
                  <Pencil onClick={() => setEditable(prev => ({ ...prev, input2: !prev.input2 }))} size={13} />
                </div>
            </div>
            <div className='intro-form style-box'>
              <p>Introduction Form</p>
              <label htmlFor="name">Your name</label>
              <input 
                className='inp21' 
                type="text" 
                id="name" 
                value={chatbotStyle.introFields.yourName || ""} 
                onChange={(e) =>
                  setChatbotStyle(prev => ({
                    ...prev,
                    introFields: {
                      ...prev.introFields,
                      yourName: e.target.value
                    }
                  }))
                }
              />  
              <label htmlFor="phone">Your phone</label> 
              <input 
                className='inp21' 
                type="text" 
                id="phone" 
                value={chatbotStyle.introFields.yourPhone || ""} 
                onChange={(e) =>
                  setChatbotStyle(prev => ({
                    ...prev,
                    introFields: {
                      ...prev.introFields,
                      yourPhone: e.target.value
                    }
                  }))
                }
              /> 
              <label htmlFor="email">Your email</label>
              <input 
                className='inp21' 
                type="text" 
                id="email" 
                value={chatbotStyle.introFields.yourEmail || ""} 
                onChange={(e) =>
                  setChatbotStyle(prev => ({
                    ...prev,
                    introFields: {
                      ...prev.introFields,
                      yourEmail: e.target.value
                    }
                  }))
                }
              />  
              <button>Thank You!</button>
            </div>
            <div className='wel-msg style-box'>
              <p>Welcome Message</p>
              <textarea
                id="welcomeMessage"
                rows="3"
                value={chatbotStyle.welcomeText || ""}
                onChange={handleChange}
                disabled={!editable.textarea}
              />
              <div className='word-count' style={{ textAlign: 'right', fontSize: '12px', color: wordCount >= wordLimit ? 'red' : 'gray' }}>
                {wordCount}/{wordLimit}
              </div>
              {wordCount >= wordLimit && (
                <div className='war-1' style={{ color: 'red', fontSize: '12px', textAlign: 'right' }}>
                  Word limit reached!
                </div>
              )}
              <div className='pen-1'>
                <Pencil onClick={() => setEditable(prev => ({ ...prev, textarea: !prev.textarea }))} size={13} />
              </div>
            </div>
            <div className="time-picker-container">
              
            </div>
          </div>
        </div>
  )
}