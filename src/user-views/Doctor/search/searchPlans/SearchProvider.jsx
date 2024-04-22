import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProviderProfile from "./ProviderProfile";

function SearchProvider() {
  const [searchValue, setSearchValue] = useState('');
  const [providers, setProviders] = useState([]);

  const navigate = useNavigate(); 

  const handleSearch = async () => {
    try { 
      const response = await axios.post('http://localhost:8000/search_provider/', { searchValue });
      navigate('/search-provider-results', { state: { results: response?.data} });
      setProviders(response?.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const viewProviderProfile = async() => {
    try{
        const response = await axios.post('http://localhost:8000/view_all_providers/', { searchValue });
        navigate('/view-provider-profile', { state: { results: response?.data } });
    }
    catch(error){
        console.log("Error:", error);
    }
}

  return (
    <div className='search-doctor-container'>
      <h1>Find your provider here</h1>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBdXfBMwiWIx1CX9ZV2d1-7G-1EnE4sR5Jiw&s" />
      <div className='search-container'>
        <input 
          type="text"
          placeholder="Search by name or specialization"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button type="submit" onClick={handleSearch}>Search</button>
      </div>
      <div className="view-all-providers">
        {providers.map(provider => (
          <ProviderProfile key={provider.id} providerData={provider} />
        ))}
      </div>

    </div>
  );
}
export default SearchProvider;