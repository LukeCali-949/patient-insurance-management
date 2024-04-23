import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const PlanContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px; /* Ensures space between cards */
  padding: 20px;
`;

const PlanCard = styled.div`
  flex: 1;
  min-width: 250px; /* Minimum width of a card */
  max-width: 350px; /* Maximum width of a card */
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 10px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
  
  &:hover {
    transform: scale(1.05);
  }

  background-color: ${props => props.selected ? '#e0e0e0' : '#ffffff'};
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

// Example plans data. You can fill this with actual plan details
const plansData = [
  { id: 'basic', name: 'Basic', price: '$8.99', description: 'Good video quality in SD (480p).' },
  { id: 'premium-individual', name: 'Premium Individual', price: '$12.99', description: 'Better video quality in HD (1080p).' },
  { id: 'premium-family', name: 'Premium Family', price: '$15.99', description: 'Best video quality in Ultra HD (4k) and HDR.' },
];

const PlanSelection = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const navigate = useNavigate();

  const handleProceedToBilling = () => {
    if (selectedPlan) {
      navigate('/billing', { state: { planId: selectedPlan } });
    } else {
      alert('Please select a plan to proceed.');
    }
  };

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Choose the plan that's right for you</h1>
      <PlanContainer>
        {plansData.map(plan => (
          <PlanCard
            key={plan.id}
            selected={selectedPlan === plan.id}
            onClick={() => setSelectedPlan(plan.id)}
          >
            <h2>{plan.name}</h2>
            <p>{plan.price}</p>
            <p>{plan.description}</p>
          </PlanCard>
        ))}
      </PlanContainer>
      {selectedPlan && (
        <ProceedButton onClick={handleProceedToBilling}>
          Proceed to Billing
        </ProceedButton>
      )}
    </>
  );
};

export default PlanSelection;
