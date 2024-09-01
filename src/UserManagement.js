import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios

const API_ENDPOINT = "https://32b4f86216.execute-api.us-east-1.amazonaws.com/Prod";
const UserManagement = () => {
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);

  const registerUser = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        API_ENDPOINT, // Replace with your endpoint
        { name }
      );
      alert('User registered successfully!');
      loadUsers();
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Failed to register user.');
    }
  };

  const loadUsers = async () => {
    try {
      const response = await axios.get(API_ENDPOINT); // Replace with your endpoint
      setUsers(response.data);
    } catch (error) {
      console.error('Error loading users:', error);
      alert('Failed to load users.');
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div>
      <h1>User Management</h1>
      <div>
        <h2>Register User</h2>
        <form onSubmit={registerUser}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required   

          />
          <button type="submit">Register</button>
        </form>
      </div>
      <div>
        <h2>Users List</h2>
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserManagement;
