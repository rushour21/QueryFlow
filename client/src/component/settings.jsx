import React, { useEffect, useState } from 'react';
import { Info } from 'lucide-react';
import '../styles/setting.css';

const UserForm = () => {
  const [emailTooltip, setEmailTooltip] = useState(false);
  const [passwordTooltip, setPasswordTooltip] = useState(false);
  const [confirmTooltip, setConfirmTooltip] = useState(false);
  const [userdetails, setUserDetails] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });


  return (
    <div className="setting-sec">
      <p >Setting</p>
      <div className='setting-cont'>
        <div className='bar-1'>
          <p className='pt'>Edit Profile</p>
        </div>
        <form action="" className='form-container'>
          <div className='input-container1'>
            <label  htmlFor="firstname">FirstName:</label>
            <div><input className='inpt' type="text" id="firstname" name="firstname" /></div>
          </div>
          <div className='input-container1'>
            <label  htmlFor="lastname">LastName:</label>
            <div><input className='inpt' type="text" id="lastname" name="lastname" /></div>
          </div>
          <div className='input-container1'>
            <label htmlFor="email">Email:</label>
            <div className='info-1'>
              <input className='inpt' type="email" id="email" name="email" />
              <div onMouseEnter={() => setEmailTooltip(true)} onMouseLeave={() => setEmailTooltip(false)}><Info size={18}/></div>
              {emailTooltip && <p className='tooltip'>User will logged out immediately</p>}
              </div>
          </div>
          <div className='input-container1'>
            <label htmlFor="password">Password:</label>
            <div className='info-1'>
              <input className='inpt' type="password" id="password" name="password" />
              <div onMouseEnter={() => setPasswordTooltip(true)} onMouseLeave={() => setPasswordTooltip(false)}><Info size={18}/></div>
              {passwordTooltip && <p className='tooltip'>User will logged out immediately</p>}
            </div>
          </div>
          <div className='input-container1'>
            <label  htmlFor="confirm-password">Confirm Password:</label>
            <div className='info-1'>
              <input className='inpt' type="password" id="confirm-password" name="confirm-password" />
              <div onMouseEnter={() => setConfirmTooltip(true)} onMouseLeave={() => setConfirmTooltip(false)}><Info size={18}/></div>
              {confirmTooltip && <p className='tooltip'>User will logged out immediately</p>}
            </div>
          </div>
          <button type="submit" className="save-button">Save</button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
