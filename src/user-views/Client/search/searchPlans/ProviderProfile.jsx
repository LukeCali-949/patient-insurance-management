import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';


function ProviderProfile({ provider }) {
    const navigate = useNavigate(); 
    const handleMoreInfoClick = () => {
        window.location.href = provider.website_link;
    };
    const handlePackages = async() =>{
        try { 
            console.log("provider.name...",provider.name);
            const response = await axios.post('http://localhost:8000/view_all_packages/', { providerName: provider.name });
            navigate('/view-insurance-plans', { state: { insurancePlans: response?.data, providerName: provider.name} });
          } catch (error) {
            console.error('Error:', error);
          }
    }

    return (
    <div className="search-results">
        <div>
        <p>{provider.name}</p>
        <p>{provider.description}</p>
        <p>Ratings :{provider.rating}</p>
        <button type="submit" onClick={handlePackages}>Check our Packages</button>
        <button type="submit" onClick={handleMoreInfoClick}>More Info</button>
        </div>
    </div>
    );
}
ProviderProfile.propTypes = {
    provider: PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
        rating: PropTypes.string, 
        website_link: PropTypes.string.isRequired 
    }).isRequired
};

export default ProviderProfile;
