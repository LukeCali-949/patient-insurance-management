import SearchDoctor from "./searchDoctors/searchDoctor";
import SearchProvider from "./searchPlans/SearchProvider";
import { Link, Route, Routes } from "react-router-dom";
import './mainSearch.css';

function MainSearch() {
  return (
    <div className="main-search">
      <h1>Equitable Care for All</h1>
      <div className="main-search-container">
        <div className="main-search-doctors-container">
            <img src="https://www.aetna.com/content/dam/aetna/asset-libraries/photos/AdobeStock_271211103_696x522.jpg" alt="Care Now"></img>
            <div className="content">
              <h2>Right Care, Right Time</h2>
              <p>Whether it's primary care, urgent care, a virtual visit or emergency care, we'll help you find the care you need.</p>
              <Link to="/search-doctor">
                <button>Find your Doctor</button>
              </Link>
            </div>
        </div>
        <div className="main-search-providers-container">
            <div className="content">
              <h2>Explore Health Plans</h2>
              <p>Explore the plan that suits you, we'll help you find the care you need.</p>
              <Link to="/search-provider">
                <button>Find your Provider</button>
              </Link>
            </div>
            <img src="https://cdn.iuhealth.org/callouts/get-care-now_callout.jpg" alt="Health Plans"></img>
        </div>
      </div>
      <Routes>
        <Route path="/search-doctor" element={<SearchDoctor />} />
        <Route path="/search-provider" element={<SearchProvider />} />
      </Routes>
    </div>
  );
}

export default MainSearch;
