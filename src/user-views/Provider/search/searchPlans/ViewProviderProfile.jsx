import { useNavigate, useLocation } from 'react-router';
import axios from 'axios';

function ViewProviderProfile(){
    const navigate = useNavigate(); 
    const location = useLocation();
    const provider = location.state.provider;

    const profileDetails = async () => {
        try { 
          const response = await axios.post('http://localhost:8000/profile_details/', { provider });
            console.log("response",response)
        } catch (error) {
          console.error('Error:', error);
        }
      };
    return(
        <div className="profile-page">
            <div className="main-card">
                <div className="profile-description">
                {provider && (
                        <>
                            <h1 className="subtitle">{provider.name}</h1>
                            <p>{provider.description}</p>
                            <p>{provider.rating}</p>
                            <p>Accepting new patients</p>
                        </>
                    )}
                </div>
            </div>

            
        </div>
    );

}
export default ViewProviderProfile;