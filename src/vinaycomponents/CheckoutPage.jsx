import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcDiscover, FaPaypal } from 'react-icons/fa';

// Styled components
const CheckoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: auto;
  padding: 2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const PaymentMethodIcons = styled.div`
  margin-bottom: 20px;
  font-size: 24px;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px 0;
  margin: 20px 0;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const PaymentButton = styled(Button)`
  background-color: #ffc439;
  &:hover {
    background-color: #e6ac00;
  }
`;

const PlanSummary = styled.div`
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  padding: 20px;
  margin: 20px 0;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

// Component logic
const CheckoutPage = () => {
  const navigate = useNavigate(); // Using useNavigate
  const { state } = useLocation();
  const planDetails = state?.plan; // This should be passed from PlanSelection page

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    nameOnCard: '',
    expiry: '',
    cvc: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({ ...paymentInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/confirmation'); // Navigate after payment
  };

  return (
    <CheckoutContainer>
      <Title>MediApp Bill Payment</Title>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="cardNumber"
          placeholder="Card Number"
          value={paymentInfo.cardNumber}
          onChange={handleInputChange}
        />
        <PaymentMethodIcons>
          <FaCcVisa />
          <FaCcMastercard />
          <FaCcAmex />
          <FaCcDiscover />
        </PaymentMethodIcons>
        <Input
          type="text"
          name="nameOnCard"
          placeholder="Name on Card"
          value={paymentInfo.nameOnCard}
          onChange={handleInputChange}
        />
        <Input
          type="text"
          name="expiry"
          placeholder="Expiry MM/YY"
          value={paymentInfo.expiry}
          onChange={handleInputChange}
        />
        <Input
          type="text"
          name="cvc"
          placeholder="CVC"
          value={paymentInfo.cvc}
          onChange={handleInputChange}
        />
        <Button type="submit">Proceed to Pay Bill</Button>
      </form>

      <PaymentButton>
        <FaPaypal /> Pay with PayPal
      </PaymentButton>

      {/* Use PlanSummary to avoid unused warnings */}
      {planDetails && (
        <PlanSummary>
          <Title>Your Selected Plan</Title>
          <SummaryItem>
            <span>Plan Name:</span>
            <span>{planDetails.name}</span>
          </SummaryItem>
          <SummaryItem>
            <span>Price:</span>
            <span>{planDetails.price}</span>
          </SummaryItem>
        </PlanSummary>
      )}
    </CheckoutContainer>
  );
};

export default CheckoutPage;
