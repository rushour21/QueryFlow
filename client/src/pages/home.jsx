import React, { useState } from 'react'
import { Mail, Linkedin, Twitter, Youtube, Instagram, GithubIcon, Figma, Send, Play, ArrowRight, CircleCheck, X  } from 'lucide-react';
import { BiSolidChat } from "react-icons/bi";
import Logo from "../assets/full.png"
import Group from "../assets/Group.png"
import Group1 from "../assets/Group1.png"
import Card from "../assets/Card 1.png"
import Ad from "../assets/Ad.png"
import El from "../assets/El.png"
import Op from "../assets/Op.png"
import Ai from "../assets/Ai.png"
import Icn from "../assets/icn.png"
import BoxImg from "../assets/box-img.png"
import Ellipse from "../assets/Ellipse 6.png"


import "../styles/home.css"

import { NavLink } from 'react-router-dom'
import chatbot from '../component/chatbot';

export default function home() {
  const [chatopen, setChatopen] = useState(false)
  const [msgopen, setMsgopen] = useState(false)
  console.log(msgopen)

  const handlebot = ()=>{
    setChatopen(!chatopen)
    setMsgopen(false)
  }
  return (
    <div className='landing-page'>
      <div className='head-ll'>
        <img src={Logo} />
        <div className='head-but'>
          <button className='lo'>Login</button>
          <button className='sig'>Sign Up</button>
        </div>
      </div>
      <div className='hero'> 
        <div className='hero-l'>
          <h2>Grow Your Business Faster <br /> with Hubly CRM</h2>
          <p>Manage leads, automate workflows, and close deals effortlessly—all in one powerful <br />platform.</p>
          <div className='hero-l-b'>
            <button>Get started <ArrowRight size={9}/></button>
            <div className='video'><button className='ply'><Play size={11}/></button>Watch Video<span></span></div>
          </div>
        </div>
        <div className='hero-r'>
          <div className='img-3s'>
            <img className='img-1' src={Group}  />
            <img className='img-2' src={Group1}  />
            <img className='img-3' src={Card}  />
          </div>
        </div>
      </div>
      
      {chatopen && <div className='chat-bot'>
        <div className='header-chat' style={{}}>
          <img className='ell' src={Ellipse} alt="" />
          <p>Hubly</p>
        </div>
        <div className='msg-chat' style={{}}>
        </div>
        <div className='footer-chat'>
            <textarea name="" id="" placeholder='Write a message'></textarea>
            <div className='send'><Send size={18}/></div>
        </div>
      </div>}

      {msgopen && <div className='msg-box'>
      <div className='popup-l'>
        <img src={Ellipse} alt="" />
        <div className='popup-con1'>
        <p>👋 Want to chat about Hubly? I'm an chatbot here to help you find your way.</p>
        <div className='cls'><X size={15}/></div>
        </div>
      </div>
      </div>}

      <div 
      onMouseEnter={() => setMsgopen(true)}  
      onMouseLeave={() => setMsgopen(false)}
      onClick={handlebot}  
      className='chat-icon'><BiSolidChat color='white' size={25}/></div>
      
      <div className='c-names'>
        <img src={Ad} />
        <img src={Ai}  />
        <img src={El}  />
        <img src={Op}  />
        <img src={El}  />
        <img src={Ai}  />
      </div>
      <div className='hero-1'>
        <div className='hero-1-t'>
          <h2>At its core, Hubly is a robust CRM <br />solution.</h2>
          <p>Hubly helps businesses streamline customer interactions, track leads,<br />
             and automate tasks—saving you time and maximizing revenue. <br />Whether you’re
              a startup or an enterprise, Hubly adapts to your needs, g
              iving you the tools to scale efficiently.
          </p>
        </div>
        <div className='hero-1-b'>
          <div className='hero-1-info'>
            <h3>MULTIPLE PLATFORMS TOGETHER!</h3>
            <p>Email communication is a breeze with our fully integrated, <br />drag & drop email builder.</p>
            <h3>CLOSE</h3>
            <p>Capture leads using our landing pages, surveys, forms, calendars,<br /> inbound phone system & more!</p>
            <h3>NURTURE</h3>
            <p>Capture leads using our landing pages, surveys, forms, calendars,<br /> inbound phone system & more!</p>
          </div>
          <div className='img-cre'>
            <img className='img-b' src={Icn} />
            <img className='img-t' src={BoxImg} />
          </div>
        </div>
      </div>
      <div className='hero-2'>
        <h2>We have plans for everyone!</h2>
        <p>We started with a strong foundation, then simply built 
          all of the <br /> sales and marketing tools ALL businesses need under one platform.
        </p>
      </div>
      <div className='hero-3'>
        <div className='card'>
          <h2>STARTER</h2>
          <p>Best for local businesses needing to improve their online reputation.</p>
          <div className='card-info'>
            <div className='price'>
              <h1>$199</h1><span>/monthly</span>
            </div>
            <p style={{fontWeight: "600"}}>What’s included</p>
            <p><CircleCheck size={15} />Unlimited Users</p>
            <p><CircleCheck size={15} />GMB Messaging</p>
            <p><CircleCheck size={15} />Reputation Management</p>
            <p><CircleCheck size={15} />GMB Call Tracking</p>
            <p><CircleCheck size={15} />24/7 Award Winning Support</p>
          </div>
          <button>SIGN UP FOR STARTER</button>
        </div>
        <div className='card'>
          <h2>GROW</h2>
          <p>Best for all businesses that want to take full control of their marketing 
            automation and track their leads, click to close.</p>
          <div className='card-info'>
            <div className='price'>
              <h1>$399</h1><span>/monthly</span>
            </div>
            <p style={{fontWeight: "600"}}>What’s included</p>
            <p><CircleCheck size={15} />Pipeline Management</p>
            <p><CircleCheck size={15} />Marketing Automation Campaigns</p>
            <p><CircleCheck size={15} />Live Call Transfer</p>
            <p><CircleCheck size={15} />GMB Messaging</p>
            <p><CircleCheck size={15} />Embed-able Form Builder</p>
            <p><CircleCheck size={15} />Reputation Management</p>
            <p><CircleCheck size={15} />24/7 Award Winning Support</p>
          </div>
          <button>SIGN UP FOR STARTER</button>
        </div>
      </div>
      <div className='footer-l'>
        <div><img className='image-f' src={Logo} /></div>
        <div className='lists-all'>
          <div className='lists'>
            <h3>Product</h3>
            <a href="#">Universal checkout</a>
            <a href="#">Payment workflows</a>
            <a href="#">Observability</a>
            <a href="#">UpliftAI</a>
            <a href="#">Apps & integrations</a>
          </div>
          <div className='lists'>
            <h3>Expand to new markets</h3>
            <a href="#">Boost payment success</a>
            <a href="#">Improve conversion rates</a>
            <a href="#">Reduce payments fraud</a>
            <a href="#">Recover revenue</a>
            <a href="#">Apps & integrations</a>
          </div>
          <div className='lists'>
            <h3>Developers</h3>
            <a href="#">Primer Docs</a>
            <a href="#">API Reference</a>
            <a href="#">Payment methods guide</a>
            <a href="#">Service status</a>
            <a href="#">Community</a>
          </div>
          <div className='lists'>
            <h3>Resources</h3>
            <a href="#">Blog</a>
            <a href="#">Success stories</a>
            <a href="#">News room</a>
            <a href="#">Terms</a>
            <a href="#">Privacy</a>
          </div>
          <div className='lists'>
            <h3>Company</h3>
            <a href="#">Career</a>
          </div>
        </div>
        <div className='iconss'>
          <Mail/>
          <Linkedin/>
          <Twitter />
          <Youtube />
          <Instagram/>
          <GithubIcon/>
          <Figma/>
        </div>
      </div>
    </div>
  )
}
