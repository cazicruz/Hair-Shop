'use client'
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

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  padding: 32px;
  margin-bottom: 32px;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 16px;
`;

const Paragraph = styled.p`
  color: #4b5563;
  margin-bottom: ${props => props.$mb || '16px'};
  line-height: 1.6;
`;

const ValuesGrid = styled.div`
  display: grid;
  gap: 24px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ValueItem = styled.div`
  margin-bottom: 0;
`;

const ValueTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 500;
  color: #111827;
  margin-bottom: 8px;
`;

const TeamGrid = styled.div`
  display: grid;
  gap: 24px;
  margin-top: 24px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const TeamMember = styled.div`
  text-align: center;
`;

const Avatar = styled.div`
  width: 96px;
  height: 96px;
  background-color: #d1d5db;
  border-radius: 50%;
  margin: 0 auto 12px;
`;

const MemberName = styled.h3`
  font-weight: 500;
  color: #111827;
  margin-bottom: 4px;
`;

const MemberRole = styled.p`
  font-size: 0.875rem;
  color: #4b5563;
`;

export default function AboutUs() {
  return (
    <Container>
      <Content>
        <Title>About Us</Title>
        
        <Card>
          <SectionTitle>Our Story</SectionTitle>
          <Paragraph>
            Founded with a passion for delivering exceptional products and services, our company has grown from a small startup to a trusted name in the industry. We believe in quality, innovation, and putting our customers first.
          </Paragraph>
          <Paragraph $mb="0">
            Over the years, we've built strong relationships with our customers and partners, constantly evolving to meet the changing needs of the market while staying true to our core values.
          </Paragraph>
        </Card>

        <Card>
          <SectionTitle>Our Mission</SectionTitle>
          <Paragraph $mb="0">
            To provide high-quality products and exceptional customer service while fostering innovation and sustainability. We strive to make a positive impact on our customers' lives and contribute to a better future for our community.
          </Paragraph>
        </Card>

        <Card>
          <SectionTitle>Our Values</SectionTitle>
          <ValuesGrid>
            <ValueItem>
              <ValueTitle>Quality First</ValueTitle>
              <Paragraph $mb="0">We never compromise on the quality of our products and services.</Paragraph>
            </ValueItem>
            <ValueItem>
              <ValueTitle>Customer Focused</ValueTitle>
              <Paragraph $mb="0">Your satisfaction is our top priority in everything we do.</Paragraph>
            </ValueItem>
            <ValueItem>
              <ValueTitle>Innovation</ValueTitle>
              <Paragraph $mb="0">We continuously improve and adapt to serve you better.</Paragraph>
            </ValueItem>
            <ValueItem>
              <ValueTitle>Integrity</ValueTitle>
              <Paragraph $mb="0">We conduct business with honesty and transparency.</Paragraph>
            </ValueItem>
          </ValuesGrid>
        </Card>

        <Card>
          <SectionTitle>Meet Our Team</SectionTitle>
          <Paragraph>
            Our diverse team of professionals brings together expertise from various fields, united by a common goal: to serve you better. We're passionate about what we do and committed to excellence.
          </Paragraph>
          <TeamGrid>
            <TeamMember>
              <Avatar />
              <MemberName>Janai Odogwu</MemberName>
              <MemberRole>CEO & Founder</MemberRole>
            </TeamMember>
            <TeamMember>
              <Avatar />
              <MemberName>Jane Nwosu</MemberName>
              <MemberRole>Chief Operations Officer</MemberRole>
            </TeamMember>
            <TeamMember>
              <Avatar />
              <MemberName>Mike Obodo</MemberName>
              <MemberRole>Head of Product</MemberRole>
            </TeamMember>
          </TeamGrid>
        </Card>
      </Content>
    </Container>
  );
}