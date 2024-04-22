import axios from 'axios';
import './appointmentModal.css';
function AppointmentModal({isOpen, onClose, onConfirm, formData, doctor}){
    
    const handleConfirm = async () => {
        try { 
            await axios.post('http://localhost:8000/send_appointment_email/', { formData, doctor });
            onClose();
        } catch (error) {
        console.error('Error:', error);
        }
    };
    return(         
        <div>
            <div className={`appointment-modal ${isOpen ? 'open':''}`}>
            <div className="appointment-modal-content">
                <label>
                    <p>Thank you, You will be contacted before an appointment is offered.</p>
                </label>
                <div className="appointment-modal-actions">
                    <button onClick={handleConfirm}>Confirm</button>
                    <button onClick={onClose} >Modify Schedule</button>
                </div>
            </div>
            </div>
        </div>
    );

}
export default AppointmentModal;