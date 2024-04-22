import React from 'react';
import { useNavigate } from 'react-router';
import './searchDoctorResults.css';


function DoctorProfile({ doctor }) {
    const navigate = useNavigate(); 
    const viewDoctorProfile = async() => {
        try{
            navigate('/view-doctor-profile', { state: { doctor } });
        }
        catch(error){
            console.log("Error:", error);
        }
    }
    const bookAppointment = async() => {
        try{
            navigate('/book-appointment',{});

        }
        catch(error){
            console.log("Error:", error);
        }
    }
    return (
    <div className="search-results">
        <img src={doctor.profile_picture} alt={doctor.name} />
        <div>
        <p>{doctor.name}</p>
        <p>Specialization: {doctor.specialization}</p>
        <p>Covid Support :{doctor.covid_support ? 'Yes' : 'No'}</p>
        <button type="submit" onClick={viewDoctorProfile}>View My Profile</button>
        <button type="submit" onClick={bookAppointment}>Book An Appointment</button>
        </div>
    </div>
    );
}

export default DoctorProfile;
