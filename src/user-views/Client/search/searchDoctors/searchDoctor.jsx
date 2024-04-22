import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './searchDoctor.css';

function SearchDoctor() {
  const [searchValue, setSearchValue] = useState('');
  const [searchSpecialty, setSearchSpecialty] = useState('');
  const [searchCovidSupport, setSearchCovidSupport] = useState('');
  const [searchAll, setSearchAll] = useState('');
  const navigate = useNavigate(); 

  const handleSearch = async () => {
    try { 
      const response = await axios.post('http://localhost:8000/search_doctor/', { searchValue });
      navigate('/search-doctor-results', { state: { results: response?.data} });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAllSearch = async () => {
    try {
      const response = await axios.post('http://localhost:8000/view_all_doctors/', { searchAll});
      navigate('/view-all-doctors', { state: { results: response?.data } });
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleCovidSupportSearch = async() => {
    try {
      const response = await axios.post('http://localhost:8000/view_all_doctors/', { searchCovidSupport});
      const covidSupportData = response?.data.filter(doctor => doctor.covidSupport);
      navigate('/search-doctor-results', { state: { results: covidSupportData } });
    } catch (error) {
      console.error('Error:', error);
    }
  }
  const handleSpecialtySearch = async() => {
    try {
      const response = await axios.post('http://localhost:8000/search_by_specialization/', { searchSpecialty });
      navigate('/search-doctor-results', { state: { results: response?.data } });
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className='search-doctor-container'>
      <h1>Find your doctor here</h1>
      <div className='search-container'>
        <input 
          type="text"
          placeholder="Search by name"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button type="submit" onClick={handleSearch}>Search</button>
      </div>
      <div className='search-container'>  
        <input 
          type="text"
          placeholder="Search by specialty"
          value={searchSpecialty}
          onChange={(e) => setSearchSpecialty(e.target.value)}
        />
        <button type="submit" onClick={handleSpecialtySearch}>Search</button>
      </div> 
      <div className='view_all_container'>
        <button type="submit" onClick={handleCovidSupportSearch}>View All Covid Support Doctors</button>
      </div>
      <div className='view_all_container'>
        <button type="submit" onClick={handleAllSearch}>View All Doctors</button>
      </div>
    </div>
  );
}
export default SearchDoctor;