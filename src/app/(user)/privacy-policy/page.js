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

const DataList = styled.div`
  margin-left: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DataItem = styled.p`
  color: #4b5563;
  line-height: 1.6;
`;

const DataLabel = styled.span`
  font-weight: 500;
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

export default function PrivacyPolicy() {
  return (
    <Container>
      <Content>
        <Title>Privacy Policy</Title>
        <LastUpdated>Last updated: November 3, 2025</LastUpdated>
        
        <Card>
          <Section>
            <SectionTitle>Introduction</SectionTitle>
            <Paragraph $mb="0">
              We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>Information We Collect</SectionTitle>
            <Paragraph>We may collect, use, store and transfer different kinds of personal data about you:</Paragraph>
            <DataList>
              <DataItem><DataLabel>Identity Data:</DataLabel> includes first name, last name, username or similar identifier.</DataItem>
              <DataItem><DataLabel>Contact Data:</DataLabel> includes billing address, delivery address, email address and telephone numbers.</DataItem>
              <DataItem><DataLabel>Transaction Data:</DataLabel> includes details about payments to and from you and other details of products and services you have purchased from us.</DataItem>
              <DataItem><DataLabel>Technical Data:</DataLabel> includes internet protocol (IP) address, browser type and version, time zone setting, browser plug-in types and versions, operating system and platform.</DataItem>
              <DataItem><DataLabel>Usage Data:</DataLabel> includes information about how you use our website, products and services.</DataItem>
            </DataList>
          </Section>

          <Section>
            <SectionTitle>How We Use Your Information</SectionTitle>
            <Paragraph>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</Paragraph>
            <BulletList>
              <BulletItem>• To register you as a new customer</BulletItem>
              <BulletItem>• To process and deliver your order</BulletItem>
              <BulletItem>• To manage our relationship with you</BulletItem>
              <BulletItem>• To improve our website, products/services, marketing or customer relationships</BulletItem>
              <BulletItem>• To administer and protect our business and website</BulletItem>
              <BulletItem>• To deliver relevant website content and advertisements to you</BulletItem>
            </BulletList>
          </Section>

          <Section>
            <SectionTitle>Data Security</SectionTitle>
            <Paragraph $mb="0">
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. We limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>Your Legal Rights</SectionTitle>
            <Paragraph>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:</Paragraph>
            <BulletList>
              <BulletItem>• Request access to your personal data</BulletItem>
              <BulletItem>• Request correction of your personal data</BulletItem>
              <BulletItem>• Request erasure of your personal data</BulletItem>
              <BulletItem>• Object to processing of your personal data</BulletItem>
              <BulletItem>• Request restriction of processing your personal data</BulletItem>
              <BulletItem>• Request transfer of your personal data</BulletItem>
              <BulletItem>• Right to withdraw consent</BulletItem>
            </BulletList>
          </Section>

          <Section>
            <SectionTitle>Cookies</SectionTitle>
            <Paragraph $mb="0">
              Our website uses cookies to distinguish you from other users. This helps us to provide you with a good experience when you browse our website and also allows us to improve our site. You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>Third-Party Links</SectionTitle>
            <Paragraph $mb="0">
              Our website may include links to third-party websites, plug-ins and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>Contact Us</SectionTitle>
            <Paragraph $mb="0">
              If you have any questions about this privacy policy or our privacy practices, please contact us at privacy@example.com or through our contact page.
            </Paragraph>
          </Section>
        </Card>
      </Content>
    </Container>
  );
}