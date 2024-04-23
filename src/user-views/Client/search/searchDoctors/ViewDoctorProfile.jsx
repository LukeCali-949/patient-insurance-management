import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import './viewDoctorProfile.css';
import axios from 'axios';
import CovidModal from './CovidModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcaseMedical, faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import { db } from '../../../../../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

function ViewDoctorProfile(){
    const navigate = useNavigate(); 
    const location = useLocation();
    const doctor = location.state.doctor;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [feedback, setFeedback] = useState({
        patient_name: '',
        comments: '',
        rating: 0,
    });
    const [feedbackList, setFeedbackList] = useState([]);

    const fetchFeedback = async() =>{
        try{
            const getFeedbackList = await getDocs(collection(db,"feedback"));
            const feedbackData = getFeedbackList.docs.map(doc => doc.data());
            setFeedbackList(feedbackData)

        }catch(error){
            console.log(error);
        }
    }
    useEffect(() => {
        fetchFeedback();
    }, []);
    const handleBookAppointment = () =>{
        setIsModalOpen(true);
    }
    const profileDetails = async () => {
        try { 
          const response = await axios.post('https://patient-health-insurance-management-jrrw.onrender.com/profile_details/', { doctor });
        } catch (error) {
          console.error('Error:', error);
        }
      }
    const confirmBookAppointment = (isChecked) => {
        if(isChecked){
            navigate('/covid-questionnaire',{ state: {covidQuestionnaire: true,  doctor:doctor}});
        }
        else{
            navigate('/book-appointment',{ state: {covidQuestionnaire: false, doctor:doctor}});
        }
    }
    const handleFeedbackChange = (e) =>{
        const {name,value} = e.target;
        setFeedback({ ...feedback, [name]:value});

    }
    const submitFeedback = async () =>{
        try{
            const feedbackDocRef = collection(db,"feedback", )
            await addDoc(feedbackDocRef, {
                doctorName: doctor.fullName,
                patientName: feedback.patient_name,
                comments: feedback.comments,
                ratings: feedback.rating,
                createdAt: new Date()
            })
            console.log("Feedback submitted successfully!");
            setIsModalOpen(false);
            setFeedback({
                patient_name: '',
                comments: '',
                rating: 0,
            });
            fetchFeedback();
        }
        catch(error){
            console.error('Error:', error);
        }
    }
    const renderStars = (rating) => {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
          if (i <= rating) {
            stars.push(<span key={i} className="filled-star">★</span>);
          } else {
            stars.push(<span key={i} className="unfilled-star">☆</span>);
          }
        }

        return stars;
    }


    const opentab = (tabname, event) => {
        var tablinks = document.getElementsByClassName("tab-links");
        var tabcontents = document.getElementsByClassName("tab-contents");
        for(let tablink of tablinks){
            tablink.classList.remove("active-link");
        }
        for(let tabcontent of tabcontents){
            tabcontent.classList.remove("active-tab");
        }
        event.currentTarget.classList.add("active-link");
        document.getElementById(tabname).classList.add("active-tab");
    }
    
    return(
        <div className="profile-page">
            <div className="main-card">
                <div className="profile-description">
                {doctor && (
                        <>
                            <img src={doctor.photoURL} alt={doctor.fullName} />
                            <h1 className="subtitle">{doctor.fullName}</h1>
                            <p>{doctor.specialization}</p>
                            
                        </>
                    )}
                </div>
                <div className="apointment-section">
                    <p>5 out of 5 stars (40 reviews)</p>
                    <p>Accepting new patients</p>
                    <p>Provides Covid Support: {doctor.covidSupport ? 'Yes':'No'}</p>
                    <button type="submit" onClick={handleBookAppointment}>Book An Appointment</button>
                </div>
            </div>

            <div className="details-container">
                <div className="tab-titles">
                    <p className="tab-links active-link" onClick={(event) => opentab('insurance', event)}>Insurance</p>
                    <p className="tab-links" onClick={(event) => opentab('location', event)}>Location</p>
                    <p className="tab-links" onClick={(event) => opentab('specialities', event)}>Hours</p>
                    <p className="tab-links" onClick={(event) => opentab('ratings_reviews', event)}>Ratings & Reviews</p>
                    
                </div>
                <div className="tab-contents active-tab" id="insurance">
                        <div className="detail-chart">
                            <h3><FontAwesomeIcon icon={faBriefcaseMedical} />  Accepted Insurance plans are: </h3>
                            <p>Aetna</p>
                            <p>Anthem</p>
                        </div>
                </div>   
                <div className="tab-contents" id="location">
                        <div className="detail-chart">
                            <p><FontAwesomeIcon icon={faMapMarkerAlt} />  { doctor.location }</p>
                        </div>
                </div> 
                <div className="tab-contents" id="specialities">
                    <div className="detail-chart">
                        <h3><FontAwesomeIcon icon={faClock} /> Hours</h3>
                        <p>Monday 10AM - 5PM</p>
                        <p>Tueday 10AM - 5PM</p>
                        <p>Thursday 10AM - 5PM</p>
                    </div>
                </div> 
                <div className="tab-contents" id="ratings_reviews">
                    <div className="detail-chart">
                        <h3>How was your experience with Dr. {doctor.fullName} ? </h3>
                        <div className="feedback-container">
                            <div className="feedback-form">
                                <input name="patient_name" placeholder="Your name" onChange={handleFeedbackChange} />
                                <textarea name="comments" placeholder="Your review" onChange={handleFeedbackChange} />
                                <input type="number" name="rating" placeholder="Your rating" onChange={handleFeedbackChange}/>
                                <button onClick={submitFeedback}>Submit Review</button>
                            </div>
                            <div className="feedbacks-list">
                                {feedbackList.map((feedbackItem, index) => (
                                    <div key={index} className="feedback">
                                        <h4>{feedbackItem.patientName}</h4>
                                        <p>Rating: {renderStars(feedbackItem.ratings)}</p>
                                        <p>{feedbackItem.comments}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div> 
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
export default ViewDoctorProfile;