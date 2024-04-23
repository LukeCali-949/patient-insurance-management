import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  margin-top: 50px;
`;

const PlanDetails = styled.div`
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  display: inline-block;
`;

const ProceedButton = styled.button`
  display: block;
  width: 200px;
  padding: 10px 20px;
  background-color: #00bfff;
  color: white;
  border: none;
  border-radius: 4px;
  margin: 20px auto;
  cursor: pointer;

  &:hover {
    background-color: #009acd;
  }
`;

const PaymentOptionsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 30px;
`;

const PaymentOptionCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  width: calc(33.333% - 20px);
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  margin: 0 10px;
  background: white;
  text-align: left;
`;

const CardTitle = styled.h3`
  color: #333;
  margin-bottom: 15px;
`;

const CardContent = styled.p`
  color: #666;
  margin-bottom: 20px;
`;

const ActionButton = styled(ProceedButton)`
  background-color: #007bff;
  &:hover {
    background-color: #0056b3;
  }
`;

// Mock plans data
const plansData = {
  'basic': { name: 'Basic', price: '$8.99/month; billed monthly (Only for MediApp Users)', description: 'Covers Basic Health Benefits for an Individual only' },
  'premium-individual': { name: 'Premium Individual', price: '$15.99/month; billed monthly (Only for MediApp Users)', description: 'Covers Premium health benefits for an Individual only' },
  'premium-family': { name: 'Premium Family', price: '$39.99/month; billed monthly (Only for MediApp Users)', description: 'Covers Premium health benefits for upto Four Individuals' },
};

const BillingPage = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Add this line
    const { planId } = location.state || {};
    const plan = plansData[planId] || {};
  
    // Function to handle clicking on "Continue as a Guest"
    const handleGuestPayClick = () => {
      navigate('/guest-payment'); // Navigate to the guest payment page
    };
  
    return (
      <Container>
        <h1>Billing Page</h1>
        {planId ? (
          <PlanDetails>
            <h2>Selected Plan: {plan.name}</h2>
            <p>Price: {plan.price}</p>
            <p>Description: {plan.description}</p>
            {/* If you have a specific billing submission function, call it here */}
          </PlanDetails>
        ) : (
          <p>No plan selected. Please go back and select a plan.</p>
        )}
        <PaymentOptionsContainer>
          {/* Card for signing in or creating an account */}
          <PaymentOptionCard>
            <CardTitle>My Health Account</CardTitle>
            <CardContent>Manage and consolidate online billing, set up personalized payment plans with autopay, access monthly statements and much more.</CardContent>
            <ActionButton>Log In or Register</ActionButton>
          </PaymentOptionCard>
  
          {/* Card for guest payment */}
          <PaymentOptionCard>
            <CardTitle>Guest Pay</CardTitle>
            <CardContent>A secure method to make an online payment without a health account. You will continue as a guest, but still provide your details for communication.</CardContent>
            <ActionButton onClick={handleGuestPayClick}>Continue as a Guest</ActionButton>
          </PaymentOptionCard>

        </PaymentOptionsContainer>
      </Container>
    );
  };
  
  export default BillingPage;