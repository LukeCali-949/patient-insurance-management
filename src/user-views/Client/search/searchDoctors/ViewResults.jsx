import React, { useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';

import DoctorProfile  from './ProfileCard';


function ViewResults(){
    const location = useLocation();
    const { results } = location.state; 
    console.log("results", results);
    if (!results) {
        return <div>No results found</div>;
      }
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
  
export default ViewResults;