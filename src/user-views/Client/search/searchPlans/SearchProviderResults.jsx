import { useLocation } from 'react-router-dom';
import ProviderProfile from './ProviderProfile';

function SearchProviderResults() {
  const location = useLocation();
  const { results } = location.state; 
  return (
    <div className='search-results-page'>
      <h2>Search Results</h2>
      <div className='results-list'>
        {results.map((provider, index) => (
          <ProviderProfile key={index} provider={provider} /> 
        ))}
      </div>
    </div>
  );
}

export default SearchProviderResults;