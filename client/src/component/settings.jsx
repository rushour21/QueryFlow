import React, { useState } from 'react';
import { Info } from 'lucide-react';
import '../styles/setting.css';

const UserForm = () => {
  const [emailTooltip, setEmailTooltip] = useState(false);
  const [passwordTooltip, setPasswordTooltip] = useState(false);
  const [confirmTooltip, setConfirmTooltip] = useState(false);

  return (
    <div className="form-container">
      <form className="user-form">
        <div className="form-group">
          <label>First name</label>
          <input type="text" defaultValue="Sarthak" />
        </div>

        <div className="form-group">
          <label>Last name</label>
          <input type="text" defaultValue="Pal" />
        </div>

        <div className="form-group info-group">
          <label>Email</label>
          <div className="input-with-icon">
            <input type="email" defaultValue="Sarthakpal08@gmail.com" />
            <div
              className="info-icon"
              onMouseEnter={() => setEmailTooltip(true)}
              onMouseLeave={() => setEmailTooltip(false)}
            >
              <Info size={16} />
              {emailTooltip && (
                <div className="tooltip">User will logged out immediately</div>
              )}
            </div>
          </div>
        </div>

        <div className="form-group info-group">
          <label>Password</label>
          <div className="input-with-icon">
            <input type="password" defaultValue="**********" />
            <div
              className="info-icon"
              onMouseEnter={() => setPasswordTooltip(true)}
              onMouseLeave={() => setPasswordTooltip(false)}
            >
              <Info size={16} />
              {passwordTooltip && (
                <div className="tooltip">User will logged out immediately</div>
              )}
            </div>
          </div>
        </div>

        <div className="form-group info-group">
          <label>Confirm Password</label>
          <div className="input-with-icon">
            <input type="password" defaultValue="**********" />
            <div
              className="info-icon"
              onMouseEnter={() => setConfirmTooltip(true)}
              onMouseLeave={() => setConfirmTooltip(false)}
            >
              <Info size={16} />
              {confirmTooltip && (
                <div className="tooltip">User will logged out immediately</div>
              )}
            </div>
          </div>
        </div>

        <button type="submit" className="save-button">Save</button>
      </form>
    </div>
  );
};

export default UserForm;
