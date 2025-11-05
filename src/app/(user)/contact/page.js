'use client'
import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background-color: #f9fafb;
`;

const Content = styled.div`
  max-width: 896px;
  margin: 0 auto;
  padding: 48px 16px;

  @media (min-width: 640px) {
    padding: 48px 24px;
  }

  @media (min-width: 1024px) {
    padding: 48px 32px;
  }
`;

const Title = styled.h1`
  font-size: 2.25rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 32px;
`;

const Grid = styled.div`
  display: grid;
  gap: 32px;
  margin-bottom: 32px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  padding: 32px;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 24px;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InfoItem = styled.div`
  margin-bottom: 0;
`;

const InfoLabel = styled.h3`
  font-weight: 500;
  color: #111827;
  margin-bottom: 4px;
`;

const InfoText = styled.p`
  color: #4b5563;
  line-height: 1.6;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SuccessMessage = styled.div`
  margin-bottom: 16px;
  padding: 16px;
  background-color: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 6px;
`;

const SuccessText = styled.p`
  color: #166534;
  font-size: 0.875rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 4px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  outline: none;
  transition: all 0.2s;
  resize: vertical;
  font-family: inherit;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const Button = styled.button`
  width: 100%;
  background-color: #2563eb;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1d4ed8;
  }
`;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <Container>
      <Content>
        <Title>Contact Us</Title>
        
        <Grid>
          <Card>
            <SectionTitle>Get In Touch</SectionTitle>
            
            <InfoSection>
              <InfoItem>
                <InfoLabel>Email</InfoLabel>
                <InfoText>support@example.com</InfoText>
              </InfoItem>
              
              <InfoItem>
                <InfoLabel>Phone</InfoLabel>
                <InfoText>+1 (555) 123-4567</InfoText>
              </InfoItem>
              
              <InfoItem>
                <InfoLabel>Address</InfoLabel>
                <InfoText>
                  123 Business Street<br />
                  Suite 100<br />
                  City, State 12345
                </InfoText>
              </InfoItem>
              
              <InfoItem>
                <InfoLabel>Business Hours</InfoLabel>
                <InfoText>
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Saturday: 10:00 AM - 4:00 PM<br />
                  Sunday: Closed
                </InfoText>
              </InfoItem>
            </InfoSection>
          </Card>

          <Card>
            <SectionTitle>Send Us a Message</SectionTitle>
            
            {submitted && (
              <SuccessMessage>
                <SuccessText>Thank you! Your message has been sent successfully.</SuccessText>
              </SuccessMessage>
            )}
            
            <FormSection>
              <FormGroup>
                <Label>Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Subject</Label>
                <Input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Message</Label>
                <TextArea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                />
              </FormGroup>
              
              <Button onClick={handleSubmit}>
                Send Message
              </Button>
            </FormSection>
          </Card>
        </Grid>
      </Content>
    </Container>
  );
}