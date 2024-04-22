import React from 'react';
import { useNavigate } from 'react-router';
// import './searchDoctorResults.css';


function ProviderProfile({ provider }) {
    // const navigate = useNavigate(); 
    // const viewDoctorProfile = async() => {
    //     try{
    //         navigate('/view-doctor-profile', { state: { provider } });
    //     }
    //     catch(error){
    //         console.log("Error:", error);
    //     }
    // }
    // const bookAppointment = async() => {
    //     try{
    //         navigate('/book-appointment',{});

    //     }
    //     catch(error){
    //         console.log("Error:", error);
    //     }
    // }
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
