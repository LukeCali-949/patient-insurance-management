import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const PlanContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px; // Ensures space between cards
  padding: 20px;
`;

const PlanCard = styled.div`
  border: 2px solid ${props => props.selected ? 'red' : '#ccc'};
  border-radius: 8px;
  margin: 10px;
  width: calc(33.333% - 20px); // Three cards with spacing
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  transition: transform 0.3s ease-in-out, border-color 0.3s ease-in-out;
  cursor: pointer;
  background-color: #fff;
  &:hover {
    transform: scale(1.03);
    border-color: red; // Highlight border on hover as well
  }
`;

const PlanHeader = styled.h2`
  background-color: ${props => props.bgcolor || '#007bff'};
  color: white;
  margin: -20px;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 8px 8px 0 0;
`;

const PlanDetails = styled.ul`
  list-style: none;
  padding: 0;
  text-align: left;
  color: #333;
`;

const PlanFeature = styled.li`
  border-bottom: 1px solid #eee;
  padding: 10px 0;
  font-size: 0.9em;
  &:last-child {
    border-bottom: none;
  }
  strong {
    color: #007bff;
  }
`;

const ProceedButton = styled.button`
  background-color: #00bfff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  margin-top: 20px;
  cursor: pointer;
  width: 100%; // Full width
  &:hover {
    background-color: #009acd;
  }
`;

const headerColors = {
  basic: '#6c757d', // gray
  'premium-individual': '#007bff', // blue
  'premium-family': '#28a745', // green
};

const plans = [
    {
    id: 'basic', 
    name: 'Basic', 
    price: '$8.99/month; billed monthly (Only for MediApp Users)', 
    details: {
      'Coverage': 'Covers Basic Health Benefits for an Individual only',
      'Medicines': 'Cost not Included',
      'Surgeries': 'Operation Theater costs not Included',
      'Consultation': 'Doctor Consultation & Surgeon Fee Covered',
      'Room Charges': 'Hospital Room Charges Covered', 
      'Services': '24/7 Online Support Available'
    }
},
{
    id: 'premium-individual', 
    name: 'Premium Individual', 
    price: '$15.99/month; billed monthly (Only for MediApp Users)', 
    details: {
      'Coverage': 'Covers Premium health benefits for an Individual only',
      'Medicines': 'Basic Medicines Cost Included',
      'Surgeries': 'Operation Theater costs are Covered',
      'Consultation': 'Doctor Consultation & Surgeon Fee Covered',
      'Room Charges': 'Hospital Room Charges Covered with Premium Benefits', 
      'Services': '24/7 Online Support Available with free Plan Upgradation'
    }

},

{
    id: 'premium-family', 
    name: 'Premium Family', 
    price: '$39.99/month; billed monthly (Only for MediApp Users))', 
    details: {
      'Coverage': 'Covers Premium health benefits for upto Four Individuals',
      'Medicines': 'Basic Medicines Cost Included',
      'Surgeries': 'Operation Theater costs are Covered',
      'Consultation': 'Doctor Consultation & Surgeon Fee Covered',
      'Room Charges': 'Hospital Room Charges Covered with Premium Benefits', 
      'Services': '24/7 Online Support Available with free Plan Upgradation'
    }

},

];

const PlanSelection = () => {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const navigate = useNavigate();
    // Inside your PlanSelection component
  
    const handleSelectPlan = (planId) => {
      const plan = plans.find(p => p.id === planId);
      setSelectedPlan(plan); // Set the selected plan
      navigate('/billing', { state: { planId: plan.id } }); // Navigate to billing page with the planId
    };
  
    return (
      <>
        <h1 style={{ textAlign: 'center' }}>Choose the plan that's right for you</h1>
        <PlanContainer>
          {plans.map(plan => (
            <PlanCard
              key={plan.id}
              selected={selectedPlan?.id === plan.id}
              onClick={() => handleSelectPlan(plan.id)}
            >
              <PlanHeader bgcolor={headerColors[plan.id]}>{plan.name}</PlanHeader>
              <PlanDetails>
                <PlanFeature><strong>Price:</strong> {plan.price}</PlanFeature>
                {Object.entries(plan.details).map(([key, value]) => (
                  <PlanFeature key={key}><strong>{key}:</strong> {value}</PlanFeature>
                ))}
              </PlanDetails>
              <ProceedButton onClick={(e) => {
                e.stopPropagation(); // Prevents the card's onClick from firing
                handleSelectPlan(plan.id);
              }}>
                Select Plan
              </ProceedButton>
            </PlanCard>
          ))}
        </PlanContainer>
      </>
    );
  };
  
  export default PlanSelection;