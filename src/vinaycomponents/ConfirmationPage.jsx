import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaCheckCircle, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

// Styled components
const ConfirmationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  max-width: 600px;
  margin: 40px auto;
  border: 2px solid #e6e6e6;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h1`
  color: #28a745; // Green color indicating success
  font-size: 2rem;
  margin-bottom: 20px;
`;

const SuccessIcon = styled(FaCheckCircle)`
  color: #28a745;
  font-size: 3rem;
  margin-bottom: 20px;
`;

const Message = styled.p`
  color: #333;
  font-size: 1.2rem;
  margin-bottom: 20px;
`;

const TransactionDetails = styled.div`
  border-top: 1px solid #e6e6e6;
  padding-top: 20px;
  width: 100%;
  text-align: left;
`;

const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const ContactSection = styled.div`
  margin-top: 20px;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const ContactIcon = styled.div`
  color: #007bff;
  font-size: 1.5rem;
  margin-right: 10px;
`;

// Component logic
const ConfirmationPage = () => {
  const location = useLocation();
  const transactionDetails = location.state?.transactionDetails || {};

  return (
    <ConfirmationContainer>
      <SuccessIcon />
      <Title>Payment Successful!</Title>
      <Message>Your billing has been completed successfully. Thank you for your payment!</Message>

      {/* Transaction Details Section */}
      {transactionDetails && (
        <TransactionDetails>
          <DetailItem>
            <span>Transaction ID:</span>
            <span>{transactionDetails.transactionId}</span>
          </DetailItem>
          <DetailItem>
            <span>Plan:</span>
            <span>{transactionDetails.planName}</span>
          </DetailItem>
          <DetailItem>
            <span>Amount Paid:</span>
            <span>{transactionDetails.amountPaid}</span>
          </DetailItem>
          {/* Add more details if needed */}
        </TransactionDetails>
      )}

      {/* Contact Information Section */}
      <ContactSection>
        <Message>If you have any questions, please contact us:</Message>
        <ContactItem>
          <ContactIcon>
            <FaPhoneAlt />
          </ContactIcon>
          <span>1-800-123-4567</span> {/* Phone number */}
        </ContactItem>
        <ContactItem>
          <ContactIcon>
            <FaEnvelope />
          </ContactIcon>
          <span>support@mediapp.com</span> {/* Email */}
        </ContactItem>
      </ContactSection>
    </ConfirmationContainer>
  );
};

export default ConfirmationPage;
