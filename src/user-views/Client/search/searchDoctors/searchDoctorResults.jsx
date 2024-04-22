import { useLocation } from 'react-router-dom';
import DoctorProfile from './ProfileCard';
import './searchDoctorResults.css';

function SearchDoctorResults() {
  const location = useLocation();
  const { results } = location.state; 
  return (
    <div className='search-results-page'>
      <h2>Search Results</h2>
      <div className='results-list'>
        {results.map((doctor, index) => (
          <DoctorProfile key={index} doctor={doctor} /> 
        ))}
      </div>
    </div>
  );
}

export default SearchDoctorResults;