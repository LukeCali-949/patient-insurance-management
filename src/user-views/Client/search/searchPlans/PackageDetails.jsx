import React from 'react';
import './packageDetails.css';


function PackageDetails({ packages }) {
    return (
    <div className="package-details">
        <div>
        <p>{packages.name}</p>
        <p>Coverage Period - {packages.coverage_period}</p>
        <p>Price - {packages.price}</p>
        <p>Eligibility - {packages.eligibility}</p>
        <button type="submit" >Add To Cart</button>
        </div>
    </div>
    );
}

export default PackageDetails;
