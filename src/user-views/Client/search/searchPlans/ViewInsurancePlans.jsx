import { useLocation } from 'react-router-dom';
import PackageDetails from './PackageDetails';


function ViewInsurancePlans() {
  const location = useLocation();
  const { insurancePlans, providerName} = location.state; 
  return (
    <div className='search-results-page'>
      <h2>Explore Our Plans at {providerName}</h2>
      <p>Plans suitable for all</p>
      <div className='results-list'>
        {insurancePlans.map((packages, index) => (
          <PackageDetails key={index} packages={packages} /> 
        ))}
      </div>
    </div>
  );
}

export default ViewInsurancePlans;