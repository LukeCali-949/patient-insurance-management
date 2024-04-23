import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Card = styled.div`
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 10px;
  padding: 16px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
`;

const Name = styled.h2`
  font-size: 1.5em;
  color: #333;
`;

const Specialty = styled.p`
  color: #666;
  font-size: 1em;
`;

const Rating = styled.p`
  color: #e67e22;
  font-size: 1em;
`;

const Button = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  margin-top: 10px;
  cursor: pointer;
  &:hover {
    background-color: #c0392b;
  }
`;

const InsuranceProvider = ({ provider, viewPlans }) => {
    const navigate = useNavigate();
  
    const handleViewPlansClick = () => {
      // Navigate to the PlanSelection page, you can pass any required state as well
      navigate('/plans', { state: { providerId: provider.id } });
    };
  
    return (
      <Card>
        <Name>{provider.name}</Name>
        <Specialty>{provider.specialty}</Specialty>
        <Rating>{provider.rating} out of 5 stars</Rating>
        <Button onClick={handleViewPlansClick}>
          {viewPlans ? 'View Plans' : 'View Profile'}
        </Button>
      </Card>
    );
  };
  
  export default InsuranceProvider;