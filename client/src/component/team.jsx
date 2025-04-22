import React, { useState, useEffect } from 'react';
import { CirclePlus, PenLine, Trash } from 'lucide-react';
import People from '../assets/People.png';
import axios from 'axios';
import '../styles/team.css';

export default function Team() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    userName: '',
    phone: '',
    email: '',
    designation: '',
  });

  const token = localStorage.getItem('authToken');

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setFormData({ userName: '', phone: '', email: '', designation: '' });
      setEditMode(false);
      setCurrentMember(null);
    }
  };

  useEffect(() => {
    const fetchMembers = async () => {
      if (!token) return;
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/members/addedmembers`, {
          headers: { Authorization: token },
        });
        setTeamMembers(res.data.members);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };
    fetchMembers();
  }, [token, refresh]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editMode) {
        // Edit request
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/members/update/${currentMember._id}`,
          formData,
          { headers: { Authorization: token } }
        );
      } else {
        // Add request
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/members/addmember`,
          formData,
          { headers: { Authorization: token } }
        );
      }

      setRefresh((prev) => !prev); // re-fetch data
      setIsOpen(false);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (member) => {
    setEditMode(true);
    setCurrentMember(member);
    setFormData({
      userName: member.userName,
      phone: member.phone,
      email: member.email,
      designation: member.designation,
    });
    setIsOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this member?')) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/members/delete/${id}`, {
        headers: { Authorization: token },
      });
      setRefresh((prev) => !prev); // re-fetch data
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  };

  return (
    <div className='team-sec'>
      <h3>Team Members</h3>
      <div className='team-a1'>
        <p>Full Name :</p>
        <p>Phone</p>
        <p>Email</p>
        <p>Role</p>
      </div>

      <div className='team-members'>
        {teamMembers.map((member) => (
          <div key={member._id} className='team-member'>
            <img src={People} alt="" />
            <p>{member.userName}</p>
            <p>{member.phone}</p>
            <p>{member.email}</p>
            <p>{member.designation}</p>
            <div>
              <PenLine size={15} className='edit' onClick={() => handleEdit(member)} />&nbsp;&nbsp;
              <Trash size={15} className='delete' onClick={() => handleDelete(member._id)} />
            </div>
          </div>
        ))}
      </div>

      <button onClick={toggleOpen}>
        <CirclePlus size={14} /> Add Team Members
      </button>

      {isOpen && <div className="overlay" onClick={toggleOpen}></div>}

      {isOpen && (
        <div className='team-form'>
          <h3>{editMode ? 'Edit' : 'Add'} Team Member</h3>
          <p>
            Talk with colleagues in a group chat. Messages in this group are only visible to
            its participants. New teammates may only be invited by the administrators.
          </p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
              className='inp'
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              value={formData.userName}
              onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
              required
            />

            <label htmlFor="phone">Phone</label>
            <input
              className='inp'
              id="phone"
              name="phone"
              type="text"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />

            <label htmlFor="email">Email</label>
            <input
              className='inp'
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <label htmlFor="role">Role</label>
            <select
              className='inp'
              id="role"
              name="role"
              value={formData.designation}
              onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
              required
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="member">Member</option>
            </select>

            <div className="form-buttons">
              <button className='cancel' type="button" onClick={toggleOpen}>Cancel</button>
              <button className='submit' type="submit" disabled={loading}>
                {loading ? 'Please wait...' : editMode ? 'Update' : 'Add'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
