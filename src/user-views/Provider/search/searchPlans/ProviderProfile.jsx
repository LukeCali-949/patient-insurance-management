import React from 'react';
import { useNavigate } from 'react-router';

function ProviderProfile({ provider }) {
    return (
    <div className="search-results">
        <div>
        <p>{provider.name}</p>
        <p>{provider.description}</p>
        <p>Ratings :{provider.rating}</p>
        <button type="submit" >Check Rates</button>
        <button type="submit" >More Info</button>
        </div>
    </div>
    );
}

export default ProviderProfile;
