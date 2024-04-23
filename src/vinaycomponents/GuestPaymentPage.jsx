import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const GuestPaymentContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 30px; // Reduced margin-top for a more compact layout
`;

const WelcomeSection = styled.div`
  background-color: #00008B; // Dark red color
  color: white;
  padding: 30px; // Reduced padding
  width: 40%; // Adjust the width as needed for a more compact layout
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormSection = styled.div`
  background-color: white;
  padding: 30px; // Reduced padding
  width: 60%; // Adjust the width as needed for a more compact layout
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px; // Reduced gap between form fields
`;

const Input = styled.input`
  padding: 8px; // Reduced padding
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.9rem; // Reduced font size
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 0.9rem; // Reduced font size
`;

const RadioButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 15px; // Reduced gap
`;

const RadioButton = styled.input`
  margin-right: 5px; // Reduced margin
`;

const Checkbox = styled.input`
  margin-right: 5px; // Reduced margin
`;

const SubmitButton = styled.button`
  padding: 8px 16px; // Reduced padding
  background-color: #696969; // Dark red color
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem; // Reduced font size

  &:hover {
    background-color: #C0C0C0; // Slightly darker red
  }
`;

const TermsLink = styled.a`
  color: #4B0000; // Dark red color
  text-decoration: underline;
  font-size: 0.9rem; // Reduced font size
`;

const GuestPaymentPage = () => {
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      dob: '',
      relationship: 'patient',
      termsAgreed: false,
    });
    const navigate = useNavigate();
  
    const handleInputChange = (event) => {
      const { name, value, type, checked } = event.target;
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Perform validation or processing as needed
      // ...
  
      // Navigate to the CheckoutPage with the formData if needed
      navigate('/checkout', { state: { ...formData } });
    };
  
    return (
      <GuestPaymentContainer>
        <WelcomeSection>
          <h1>Welcome to MediApp Bill Pay!</h1>
        </WelcomeSection>
        <FormSection>
          <h2>Proceed With Filling Your Details Before Billing!</h2>
          <Form onSubmit={handleSubmit}>
            
            <Label htmlFor="firstName">First Name</Label>
            <Input 
              id="firstName" 
              name="firstName" 
              value={formData.firstName} 
              onChange={handleInputChange} 
              placeholder="First Name" 
            />
  
            <Label htmlFor="lastName">Last Name</Label>
            <Input 
              id="lastName" 
              name="lastName" 
              value={formData.lastName} 
              onChange={handleInputChange} 
              placeholder="Last Name" 
            />
  
            <Label htmlFor="dob">Date of Birth</Label>
            <Input 
              type="date" 
              id="dob" 
              name="dob" 
              value={formData.dob} 
              onChange={handleInputChange} 
            />
  
            <RadioButtonGroup>
              <RadioButton 
                type="radio" 
                id="patient" 
                name="relationship" 
                value="patient" 
                checked={formData.relationship === 'patient'}
                onChange={handleInputChange}
              />
              <Label htmlFor="patient">I am a patient</Label>
              <RadioButton 
                type="radio" 
                id="not-patient" 
                name="relationship" 
                value="not-patient" 
                checked={formData.relationship === 'not-patient'}
                onChange={handleInputChange}
              />
              <Label htmlFor="not-patient">I am not a patient</Label>
            </RadioButtonGroup>
  
            <div>
              <Checkbox 
                type="checkbox" 
                id="agree" 
                name="termsAgreed" 
                checked={formData.termsAgreed}
                onChange={handleInputChange}
              />
              <Label htmlFor="agree">I agree to the <TermsLink href="#">Terms of Use</TermsLink></Label>
            </div>
  
            <SubmitButton type="submit">CONTINUE</SubmitButton>
          </Form>
        </FormSection>
      </GuestPaymentContainer>
    );
  };
  
  export default GuestPaymentPage;