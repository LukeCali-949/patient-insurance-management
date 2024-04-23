import { useState } from "react";
import { SnackbarProvider } from "notistack";

import LandingPage from "./components/ui/LandingPageUI/LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./components/ui/authUI/RegisterPage";
import Navbar from "./components/ui/LandingPageUI/Navbar";
import LoginPage from "./components/ui/authUI/LoginPage";
import DoctorApp from "./user-views/Doctor/DoctorApp";
import ClientApp from "./user-views/Client/ClientApp";
import ProviderApp from "./user-views/Provider/ProviderApp";
import { AuthContextProvider } from "./context/AuthContext";
import SearchDoctorResults from "./user-views/Client/search/searchDoctors/searchDoctorResults";
import ViewDoctorProfile from "./user-views/Client/search/searchDoctors/ViewDoctorProfile";
import CovidQuestionnaire from "./user-views/Client/search/searchDoctors/CovidQuestionnaire";
import BookAppointment from "./user-views/Client/search/searchDoctors/BookAppointment";
import ViewResults from "./user-views/Client/search/searchDoctors/ViewResults";
import SearchDoctor from "./user-views/Client/search/searchDoctors/searchDoctor";
import SearchProvider from "./user-views/Client/search/searchPlans/SearchProvider";
import SearchProviderResults from "./user-views/Client/search/searchPlans/SearchProviderResults";
import ProviderProfile from "./user-views/Client/search/searchPlans/ProviderProfile";
import ViewInsurancePlans from "./user-views/Client/search/searchPlans/ViewInsurancePlans";
import UserDetails from "./components/ui/Profile/UserDetails";

import PlanSelection from "../src/vinaycomponents/PlanSelection";
import BillingPage from "../src/vinaycomponents/BillingPage";
import CheckoutPage from "../src/vinaycomponents/CheckoutPage";
import ConfirmationPage from "../src/vinaycomponents/ConfirmationPage";
import InsuranceProvider from "../src/vinaycomponents/InsuranceProvider";
import ProviderDetails from "../src/vinaycomponents/ProviderDetails";
import ProviderList from "../src/vinaycomponents/ProviderList";
import GuestPaymentPage from "../src/vinaycomponents/GuestPaymentPage";

function App() {
  const starterRoute =
    "/Patient-and-Health-Insurance-Management-System-Group20-Frontend1";

  return (
    <div className="bg-gray-900 h-screen">
      <AuthContextProvider>
        <SnackbarProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/doctor/*" element={<DoctorApp />} />
              <Route path="/client/*" element={<ClientApp />} />
              <Route path="/provider/*" element={<ProviderApp />}></Route>
              <Route path="/search-doctor" element={<SearchDoctor />} />
              <Route path="/search-provider" element={<SearchProvider />} />
              <Route
                path="/search-doctor-results"
                element={<SearchDoctorResults />}
              />
              <Route
                path="/view-doctor-profile"
                element={<ViewDoctorProfile />}
              />
              <Route path="/view-all-doctors" element={<ViewResults />} />
              <Route path="/book-appointment" element={<BookAppointment />} />
              <Route
                path="/search-by-condition"
                element={<SearchDoctorResults />}
              />
              <Route
                path="/covid-questionnaire"
                element={<CovidQuestionnaire />}
              />
              <Route
                path="/view-provider-profile"
                element={<SearchProviderResults />}
              />
              <Route
                path="/search-provider-results"
                element={<SearchProviderResults />}
              />
              <Route
                path="/view-insurance-plans"
                element={<ViewInsurancePlans />}
              ></Route>
              <Route path="/profile-details" element={<UserDetails />}></Route>
              <Route path="/billing1" element={<ProviderList />} />
              <Route
                path="/providers/:providerId"
                element={<InsuranceProvider />}
              />
              <Route path="/plans" element={<PlanSelection />} />
              <Route path="/billing" element={<BillingPage />} />
              <Route path="/guest-payment" element={<GuestPaymentPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/confirmation" element={<ConfirmationPage />} />
              <Route path="*" element={<LandingPage />} />
            </Routes>
          </Router>
        </SnackbarProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
