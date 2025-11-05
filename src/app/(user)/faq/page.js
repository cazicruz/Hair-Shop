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
  margin-bottom: 16px;
`;

const Subtitle = styled.p`
  color: #4b5563;
  margin-bottom: 32px;
`;

const CategorySection = styled.div`
  &:not(:last-child) {
    margin-bottom: 32px;
  }
`;

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  padding: 24px;
`;

const CategoryTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 16px;
`;

const QuestionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const QuestionItem = styled.div`
  border-bottom: 1px solid #e5e7eb;

  &:last-child {
    border-bottom: none;
  }
`;

const QuestionButton = styled.button`
  width: 100%;
  padding: 16px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #2563eb;
  }
`;

const QuestionText = styled.span`
  font-weight: 500;
  color: #111827;
  padding-right: 16px;
`;

const ToggleIcon = styled.span`
  color: #6b7280;
  font-size: 1.25rem;
  flex-shrink: 0;
`;

const AnswerText = styled.div`
  padding-bottom: 16px;
  color: #4b5563;
  line-height: 1.6;
`;

const CTACard = styled.div`
  margin-top: 48px;
  background-color: #eff6ff;
  border-radius: 8px;
  padding: 32px;
  text-align: center;
`;

const CTATitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 8px;
`;

const CTAText = styled.p`
  color: #4b5563;
  margin-bottom: 16px;
`;

const CTAButton = styled.button`
  background-color: #2563eb;
  color: white;
  padding: 8px 24px;
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

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      category: "General",
      questions: [
        {
          question: "What are your business hours?",
          answer: "We are open Monday through Friday from 9:00 AM to 6:00 PM, and Saturday from 10:00 AM to 4:00 PM. We are closed on Sundays and major holidays."
        },
        {
          question: "How can I contact customer support?",
          answer: "You can reach our customer support team via email at support@example.com, by phone at +1 (555) 123-4567, or through our contact form. We typically respond within 24 hours during business days."
        },
        {
          question: "Do you have a physical store?",
          answer: "Yes, we have a physical location at 123 Business Street, Suite 100, City, State 12345. You're welcome to visit us during our business hours."
        }
      ]
    },
    {
      category: "Orders & Shipping",
      questions: [
        {
          question: "How long does shipping take?",
          answer: "Standard shipping typically takes 5-7 business days. Express shipping takes 2-3 business days. International orders may take 10-15 business days depending on the destination."
        },
        {
          question: "Do you ship internationally?",
          answer: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. You can see the exact shipping cost during checkout."
        },
        {
          question: "How can I track my order?",
          answer: "Once your order ships, you'll receive a confirmation email with a tracking number. You can use this number to track your package on our website or the carrier's website."
        },
        {
          question: "What if my order arrives damaged?",
          answer: "If your order arrives damaged, please contact us within 48 hours with photos of the damage. We'll arrange for a replacement or full refund immediately."
        }
      ]
    },
    {
      category: "Returns & Refunds",
      questions: [
        {
          question: "What is your return policy?",
          answer: "We accept returns within 30 days of purchase. Items must be in original condition with all tags attached. Custom or personalized items cannot be returned unless defective."
        },
        {
          question: "How do I initiate a return?",
          answer: "To start a return, contact our customer service team or log into your account and select the order you wish to return. We'll provide you with a return shipping label and instructions."
        },
        {
          question: "How long do refunds take?",
          answer: "Once we receive your returned item, we'll process your refund within 5-10 business days. The refund will be issued to your original payment method."
        },
        {
          question: "Who pays for return shipping?",
          answer: "For defective items or our errors, we cover return shipping costs. For other returns, the customer is responsible for return shipping unless otherwise specified in a promotion."
        }
      ]
    },
    {
      category: "Payment & Pricing",
      questions: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, and Google Pay."
        },
        {
          question: "Is it safe to use my credit card on your site?",
          answer: "Yes, our website uses industry-standard SSL encryption to protect your payment information. We never store your full credit card details on our servers."
        },
        {
          question: "Do you offer price matching?",
          answer: "Yes, we offer price matching on identical items from authorized retailers. Contact us with proof of the lower price within 7 days of your purchase."
        },
        {
          question: "Do you offer discounts for bulk orders?",
          answer: "Yes, we offer volume discounts for large orders. Please contact our sales team at sales@example.com with your requirements for a custom quote."
        }
      ]
    },
    {
      category: "Account & Privacy",
      questions: [
        {
          question: "Do I need an account to make a purchase?",
          answer: "No, you can checkout as a guest. However, creating an account allows you to track orders, save addresses, and access exclusive member benefits."
        },
        {
          question: "How do I reset my password?",
          answer: "Click the 'Forgot Password' link on the login page. Enter your email address and we'll send you instructions to reset your password."
        },
        {
          question: "How do you protect my personal information?",
          answer: "We take data security seriously and use industry-standard encryption and security measures. Please see our Privacy Policy for detailed information about how we collect, use, and protect your data."
        },
        {
          question: "Can I delete my account?",
          answer: "Yes, you can request account deletion by contacting our customer support team. Please note that some information may be retained for legal and accounting purposes."
        }
      ]
    }
  ];

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  let questionIndex = 0;

  return (
    <Container>
      <Content>
        <Title>Frequently Asked Questions</Title>
        <Subtitle>Find answers to common questions about our products and services</Subtitle>
        
        {faqs.map((category, catIndex) => (
          <CategorySection key={catIndex}>
            <Card>
              <CategoryTitle>{category.category}</CategoryTitle>
              <QuestionList>
                {category.questions.map((faq, qIndex) => {
                  const currentIndex = questionIndex++;
                  return (
                    <QuestionItem key={qIndex}>
                      <QuestionButton onClick={() => toggleQuestion(currentIndex)}>
                        <QuestionText>{faq.question}</QuestionText>
                        <ToggleIcon>
                          {openIndex === currentIndex ? '−' : '+'}
                        </ToggleIcon>
                      </QuestionButton>
                      {openIndex === currentIndex && (
                        <AnswerText>{faq.answer}</AnswerText>
                      )}
                    </QuestionItem>
                  );
                })}
              </QuestionList>
            </Card>
          </CategorySection>
        ))}

        <CTACard>
          <CTATitle>Still have questions?</CTATitle>
          <CTAText>Can't find the answer you're looking for? Our customer support team is here to help.</CTAText>
          <CTAButton>Contact Support</CTAButton>
        </CTACard>
      </Content>
    </Container>
  );
}