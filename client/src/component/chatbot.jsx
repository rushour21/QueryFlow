import React from 'react'
import { Pencil } from 'lucide-react';


export default function chatbot() {
  return (
    <div className='chatbot-sec'>
      <div className='chatbot-dis'></div>
      <div className='box-styles'>
        <div className='header style-box'>
          <p>Header color</p>
          <div>
            <div className='color-box' style={{ backgroundColor: '#ffffff' }}></div>
            <div className='color-box' style={{ backgroundColor: '#000000' }}></div>
            <div className='color-box' style={{ backgroundColor: '#33475B' }}></div>
          </div>
          <div>
            <div className='color-box1' style={{ backgroundColor: '#F9F9F9' }}></div>
            <input type="text" />
          </div>
        </div>
        <div className='background style-box'>
          <p>Custom Background Color</p>
          <div>
            <div className='color-box' style={{ backgroundColor: '#ffffff' }}></div>
            <div className='color-box' style={{ backgroundColor: '#000000' }}></div>
            <div className='color-box' style={{ backgroundColor: '#FAFBFC' }}></div>
          </div>
          <div>
            <div className='color-box1' style={{ backgroundColor: '#F9F9F9' }}></div>
            <input type="text" />
          </div>
        </div>
        <div className='chat-mesg style-box'>
            <div><input type="text" /><Pencil/></div>
            <div><input type="text" /><Pencil/></div>
        </div>
      </div>
    </div>
  )
}
