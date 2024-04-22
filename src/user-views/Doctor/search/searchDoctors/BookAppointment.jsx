import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router';
import './bookAppointment.css';
import AppointmentModal from "./AppointmentModal";

function BookAppointment(){
    const navigate = useNavigate(); 
    const location = useLocation();
    const [formData, setFormData] = useState({
        patient:'',
        patientFirstName:'',
        patientLastName:'',
        contactPhone:'',
        emailAddress:'',
        patientGender:'',
        dob:'',
        appointmentDate:'',
        appointmentTime:'',
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const confirmAppointmentRequest = (isChecked) => {
        if(isChecked){
            navigate('/covid-questionnaire',{ state: {covidQuestionnaire: true}});
        }
        else{
            navigate('/book-appointment',{ state: {covidQuestionnaire: false}});
        }
    }
    const handleChange = (e) =>{
        const {name,value} = e.target;
        setFormData({
            ...formData,
            [name]:value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        setIsModalOpen(true);
    };


    return(
       <div className="appointment-form">
        <h2>Appointment Request Form</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>First Name</label>
                <input type="text" name="patientFirstName" value={formData.patientFirstName} onChange={handleChange}  />
            </div>
            <div className="form-group">
                <label>Last Name</label>
                <input type="text" name="patientLastName" value={formData.patientLastName} onChange={handleChange}  />
            </div>
            <div className="form-group">
                <label>Gender</label>
                <input type="text" name="patientGender" value={formData.patientGender} onChange={handleChange}  />
            </div>
            <div className="form-group">
                <label>Contact</label>
                <input type="number" name="contactPhone" value={formData.contactPhone} onChange={handleChange}  />
            </div>
            <div className="form-group">
                <label>Email Address</label>
                <input type="email" name="emailAddress" value={formData.emailAddress} onChange={handleChange}  />
            </div>
            <div className="form-group">
                <label>Preferred Appointment Date</label>
                <input type="date" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange}  />
            </div>
            <div className="form-group">
                <label>Preferred Appointment Time</label>
                <input type="time" name="appointmentTime" value={formData.appointmentTime} onChange={handleChange}  />
            </div>
            <button type="submit">Submit</button>
        </form>
        {isModalOpen && (
                <AppointmentModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={confirmAppointmentRequest}
                />
            )}
        
       </div>

    );
    
}
export default BookAppointment;