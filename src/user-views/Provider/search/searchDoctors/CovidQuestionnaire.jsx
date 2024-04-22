import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import './covidQuestionnaire.css';

function CovidQuestionnaire(){
    const navigate = useNavigate(); 
    const [formData, setFormData] = useState({
        symptoms: '',
        positiveTest: '',
        waitingResults: '',
        testedPositive: '',
        commercialFlight: '',
        closeProximity: '',
        higherRisk: '',
        higherRiskExplanation: ''
    });
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/covid-questionnaire/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to submit form data');
            }
            else{
                navigate('/book-appointment',{});
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return(
        <div>
            <form className="covid-questionnaire" onSubmit={handleSubmit}>
                <p>
                    1. In the past 14 days, have you been in close proximity to anyone who was experiencing any of the above symptoms or has experienced any of the above symptoms since your contact?
                    <br />
                    <input type="radio" id="symptoms-yes" name="symptoms" value="yes" onChange={handleInputChange}/>
                    <label htmlFor="symptoms-yes">Yes</label>
                    <input type="radio" id="symptoms-no" name="symptoms" value="no" onChange={handleInputChange} />
                    <label htmlFor="symptoms-no">No</label>
                </p>
                <p>
                    2. In the past 14 days, have you been in close proximity to anyone who has tested positive for COVID-19?
                    <br />
                    <input type="radio" id="positive-test-yes" name="positiveTest" value="yes" onChange={handleInputChange}/>
                    <label htmlFor="positive-test-yes">Yes</label>
                    <input type="radio" id="positive-test-no" name="positiveTest" value="no" onChange={handleInputChange}/>
                    <label htmlFor="positive-test-no">No</label>
                </p>
                <p>
                    3. Have you been tested for COVID-19 and are waiting to receive test results?
                    <br />
                    <input type="radio" id="waiting-results-yes" name="waitingResults" value="yes" onChange={handleInputChange}/>
                    <label htmlFor="waiting-results-yes">Yes</label>
                    <input type="radio" id="waiting-results-no" name="waitingResults" value="no" onChange={handleInputChange}/>
                    <label htmlFor="waiting-results-no">No</label>
                </p>
                <p>
                    4. Have you tested positive for COVID-19, or are you presumptively positive for COVID-19 based on your health care provider’s assessment or your symptoms?
                    <br />
                    <input type="radio" id="tested-positive-yes" name="testedPositive" value="yes" onChange={handleInputChange}/>
                    <label htmlFor="tested-positive-yes">Yes</label>
                    <input type="radio" id="tested-positive-no" name="testedPositive" value="no" onChange={handleInputChange}/>
                    <label htmlFor="tested-positive-no">No</label>
                </p>
                <p>
                    NOTE: If you have tested positive for COVID-19 or have been presumptively positive for COVID-19 based on your health care provider’s assessment or your symptoms, please contact your manager or human resources representative when: (1) you have had no fever for at least 72 hours (3 full days), without the use of fever-reducing medications; (2) your other symptoms have improved; and at least 7 days have elapsed since your symptoms first appeared.
                </p>
                <p>
                    5. In the past 14 days, have you been on a commercial flight or traveled outside of the United States?
                    <br />
                    <input type="radio" id="commercial-flight-yes" name="commercialFlight" value="yes" onChange={handleInputChange}/>
                    <label htmlFor="commercial-flight-yes">Yes</label>
                    <input type="radio" id="commercial-flight-no" name="commercialFlight" value="no" onChange={handleInputChange}/>
                    <label htmlFor="commercial-flight-no">No</label>
                </p>
                <p>
                    6. In the past 14 days, have you been in close proximity to anyone who has been on a commercial flight or travelled outside of the United States?
                    <br />
                    <input type="radio" id="close-proximity-yes" name="closeProximity" value="yes" onChange={handleInputChange}/>
                    <label htmlFor="close-proximity-yes">Yes</label>
                    <input type="radio" id="close-proximity-no" name="closeProximity" value="no" onChange={handleInputChange}/>
                    <label htmlFor="close-proximity-no">No</label>
                </p>
                <p>
                    7. Is there any reason why you feel you are at higher risk of contracting COVID-19 or experiencing complications from COVID-19 by entering the facility? If “yes”, please provide a brief explanation.
                    <br />
                    <input type="radio" id="higher-risk-yes" name="higherRisk" value="yes" onChange={handleInputChange}/>
                    <label htmlFor="higher-risk-yes">Yes</label>
                    <input type="radio" id="higher-risk-no" name="higherRisk" value="no" onChange={handleInputChange}/>
                    <label htmlFor="higher-risk-no">No</label>
                </p>
                <textarea id="higher-risk-explanation" name="higherRiskExplanation" placeholder="Additional Comments" onChange={handleInputChange}></textarea>
                <br />
                <button type="submit" >Submit</button>
            </form>
        </div>
    );
    
}
export default CovidQuestionnaire;
