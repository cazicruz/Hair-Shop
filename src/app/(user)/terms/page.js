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
  margin-bottom: 16px;
`;

const LastUpdated = styled.p`
  color: #4b5563;
  margin-bottom: 32px;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  padding: 32px;
`;

const Section = styled.section`
  &:not(:last-child) {
    margin-bottom: 32px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 16px;
`;

const Paragraph = styled.p`
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: ${props => props.$mb || '12px'};
`;

const BulletList = styled.div`
  margin-left: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const BulletItem = styled.p`
  color: #4b5563;
  line-height: 1.6;
`;

export default function TermsOfService() {
    const support ='suport@Bclassyhairs.com'
  return (
    <Container>
      <Content>
        <Title>Terms of Service</Title>
        <LastUpdated>Last updated: November 3, 2025</LastUpdated>
        
        <Card>
          <Section>
            <SectionTitle>Agreement to Terms</SectionTitle>
            <Paragraph $mb="0">
              By accessing or using our website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>Use License</SectionTitle>
            <Paragraph>
              Permission is granted to temporarily access the materials on our website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </Paragraph>
            <BulletList>
              <BulletItem>• Modify or copy the materials</BulletItem>
              <BulletItem>• Use the materials for any commercial purpose or for any public display</BulletItem>
              <BulletItem>• Attempt to reverse engineer any software contained on our website</BulletItem>
              <BulletItem>• Remove any copyright or other proprietary notations from the materials</BulletItem>
              <BulletItem>• Transfer the materials to another person or mirror the materials on any other server</BulletItem>
            </BulletList>
          </Section>

          <Section>
            <SectionTitle>User Accounts</SectionTitle>
            <Paragraph>
              When you create an account with us, you guarantee that the information you provide is accurate, complete, and current at all times. You are responsible for:
            </Paragraph>
            <BulletList>
              <BulletItem>• Maintaining the confidentiality of your account and password</BulletItem>
              <BulletItem>• Restricting access to your computer and account</BulletItem>
              <BulletItem>• All activities that occur under your account</BulletItem>
              <BulletItem>• Notifying us immediately of any unauthorized use of your account</BulletItem>
            </BulletList>
          </Section>

          <Section>
            <SectionTitle>Prohibited Uses</SectionTitle>
            <Paragraph>You may not use our website:</Paragraph>
            <BulletList>
              <BulletItem>• In any way that violates any applicable national or international law or regulation</BulletItem>
              <BulletItem>• To transmit, or procure the sending of, any advertising or promotional material without our prior written consent</BulletItem>
              <BulletItem>• To impersonate or attempt to impersonate the company, a company employee, another user, or any other person or entity</BulletItem>
              <BulletItem>• To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the website</BulletItem>
              <BulletItem>• To introduce any viruses, trojan horses, worms, logic bombs, or other material that is malicious or technologically harmful</BulletItem>
            </BulletList>
          </Section>

          <Section>
            <SectionTitle>Intellectual Property</SectionTitle>
            <Paragraph $mb="0">
              The service and its original content, features, and functionality are and will remain the exclusive property of our company and its licensors. The service is protected by copyright, trademark, and other laws. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>Purchases and Payment</SectionTitle>
            <Paragraph $mb="0">
              If you wish to purchase any product or service made available through our website, you may be asked to supply certain information relevant to your purchase. You represent and warrant that you have the legal right to use any payment method you provide to us.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>Returns and Refunds</SectionTitle>
            <Paragraph $mb="0">
              We accept returns within 30 days of purchase. Items must be in their original condition with all tags attached. Refunds will be processed to the original payment method within 5-10 business days after we receive the returned item. Custom or personalized items are not eligible for returns.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>Limitation of Liability</SectionTitle>
            <Paragraph $mb="0">
              In no event shall our company, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>Disclaimer</SectionTitle>
            <Paragraph $mb="0">
              Your use of the service is at your sole risk. The service is provided on an "AS IS" and "AS AVAILABLE" basis. The service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>Governing Law</SectionTitle>
            <Paragraph $mb="0">
              These Terms shall be governed and construed in accordance with the laws of our jurisdiction, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>Changes to Terms</SectionTitle>
            <Paragraph $mb="0">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>Contact Information</SectionTitle>
            <Paragraph $mb="0">
              If you have any questions about these Terms of Service, please contact us at `{support}` or through our contact page.
            </Paragraph>
          </Section>
        </Card>
      </Content>
    </Container>
  );
}