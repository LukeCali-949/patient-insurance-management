import React, { useState } from "react";
import './covidModal.css';
function CovidModal({isOpen, onClose, onConfirm}){
    const [isChecked,setIsChecked] = useState(false);
    const handleConfirm = () =>{
        onConfirm(isChecked);
        onClose();
    };
    return(
        <div className={`modal ${isOpen ? 'open':''}`}>
            <div className="covid-modal-content">
                <h2>COVID-19 Questionnaire</h2>
                <label>
                    <input type='checkbox' checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
                    <p>I confirm that I am willing to fill out the COVID-19 questionnaire.</p>
                </label>
                <div className="covid-modal-actions">
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={handleConfirm} disabled={!isChecked}>Confirm</button>
                </div>
            </div>


        </div>
    );
}
export default CovidModal;