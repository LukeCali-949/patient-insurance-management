import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import './searchDoctorResults.css';
import CovidModal from './CovidModal';


function DoctorProfile({ doctor }) {
    const navigate = useNavigate(); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const viewDoctorProfile = async() => {
        try{
            navigate('/view-doctor-profile', { state: { doctor } });
        }
        catch(error){
            console.log("Error:", error);
        }
    }
    const handleBookAppointment = () =>{
        setIsModalOpen(true);
    }
    const confirmBookAppointment = (isChecked) => {
        if(isChecked){
            navigate('/covid-questionnaire',{ state: {covidQuestionnaire: true,  doctor:doctor}});
        }
        else{
            navigate('/book-appointment',{ state: {covidQuestionnaire: false, doctor:doctor}});
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
        <img src={doctor.photoURL} alt={doctor.fullName} />
        <div>
        <p>{doctor.fullName}</p>
        <p>Specialization: {doctor.specialization}</p>
        <p>Provides Covid Support :{doctor.covidSupport ? 'Yes' : 'No'}</p>
        <button type="submit" onClick={viewDoctorProfile}>View My Profile</button>
        <button type="submit" onClick={handleBookAppointment}>Book An Appointment</button>
        </div>
        {isModalOpen && (
                <CovidModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={confirmBookAppointment}
                />
            )}
    </div>
    );
}

export default DoctorProfile;
