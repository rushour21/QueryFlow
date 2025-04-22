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

  const [originalUser, setOriginalUser] = useState({});

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/getuser`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('authToken')
          }
        });
        const data = await response.json();
        setUserDetails(prev => ({
          ...prev,
          firstname: data.user.firstName,
          lastname: data.user.lastName,
          email: data.user.email
        }));
        
        setOriginalUser({
          email: data.user.email
        });
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchUserDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userdetails.password !== userdetails.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const emailChanged = userdetails.email !== originalUser.email;
    const passwordChanged = userdetails.password !== '';

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('authToken')
        },
        body: JSON.stringify(userdetails)
      });
      if (response.status === 403) {
        alert('Members cannot update profile.');
        return;
      }
      if (!response.ok) throw new Error('Update failed');

      alert('User updated successfully!');

      if (emailChanged || passwordChanged) {
        alert('You will be logged out due to email/password update.');
        localStorage.removeItem('authToken');
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="setting-sec">
      <p>Setting</p>
      <div className="setting-cont">
        <div className="bar-1">
          <p className="pt">Edit Profile</p>
        </div>
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="input-container1">
            <label htmlFor="firstname">FirstName:</label>
            <div>
              <input
                className="inpt"
                type="text"
                id="firstname"
                name="firstname"
                value={userdetails.firstname}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="input-container1">
            <label htmlFor="lastname">LastName:</label>
            <div>
              <input
                className="inpt"
                type="text"
                id="lastname"
                name="lastname"
                value={userdetails.lastname}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="input-container1">
            <label htmlFor="email">Email:</label>
            <div className="info-1">
              <input
                className="inpt"
                type="email"
                id="email"
                name="email"
                value={userdetails.email}
                onChange={handleChange}
              />
              <div
                onMouseEnter={() => setEmailTooltip(true)}
                onMouseLeave={() => setEmailTooltip(false)}
              >
                <Info size={18} />
              </div>
              {emailTooltip && <p className="tooltip">User will be logged out immediately</p>}
            </div>
          </div>

          <div className="input-container1">
            <label htmlFor="password">Password:</label>
            <div className="info-1">
              <input
                className="inpt"
                type="password"
                id="password"
                name="password"
                value={userdetails.password}
                onChange={handleChange}
              />
              <div
                onMouseEnter={() => setPasswordTooltip(true)}
                onMouseLeave={() => setPasswordTooltip(false)}
              >
                <Info size={18} />
              </div>
              {passwordTooltip && <p className="tooltip">User will be logged out immediately</p>}
            </div>
          </div>

          <div className="input-container1">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <div className="info-1">
              <input
                className="inpt"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={userdetails.confirmPassword}
                onChange={handleChange}
              />
              <div
                onMouseEnter={() => setConfirmTooltip(true)}
                onMouseLeave={() => setConfirmTooltip(false)}
              >
                <Info size={18} />
              </div>
              {confirmTooltip && <p className="tooltip">User will be logged out immediately</p>}
            </div>
            {userdetails.confirmPassword &&
              userdetails.password !== userdetails.confirmPassword && (
                <p className="error-msg">Passwords do not match</p>
              )}
          </div>

          <button type="submit" className="save-button">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
