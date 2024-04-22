import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './sendMessage.css';

const SendMessageForm = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [provider, setProvider] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState('');

  useEffect(() => {
    fetchDoctors();
    fetchProvider();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:8000/doctor/');
      setDoctors(response.data);
      console.log('Doctors:', response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const fetchProvider = async () => {
    try {
      const response = await axios.get('http://localhost:8000/provider/');
      setProvider(response.data);
      console.log('provider:', response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message || !selectedDoctor || !selectedProvider) return;
    try {
      const response = await axios.post(
        'http://localhost:8000/message/',
        { message, doctor: selectedDoctor, provider: selectedProvider},
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Message sent:', message);
      console.log('doctor:', selectedDoctor);
      console.log('provider:', selectedProvider);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="send-message-form">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type here"
        rows={3}
      />
      <select
        value={selectedDoctor}
        onChange={(e) => setSelectedDoctor(e.target.value)}
      >
        <option value="">Select a doctor</option>
        {doctors.map((doctor, index) => (
          <option key={index} value={doctor.name}>
            {doctor.name} - {doctor.specialty}
          </option>
        ))}
      </select>
      <select
        value={selectedProvider}
        onChange={(e) => setSelectedProvider(e.target.value)}
      >
        <option value="">Select a provider</option>
        {provider.map((provider, index) => (
          <option key={index} value={provider.name}>
            {provider.name}
          </option>
        ))}
      </select>

      <button type="submit">Send</button>
    </form>
  );
};

export default SendMessageForm;
