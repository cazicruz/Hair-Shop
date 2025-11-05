'use client'
import React, { useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { BsQuestionCircleFill, BsChevronDown, BsLightningChargeFill } from 'react-icons/bs'
import { FaWhatsapp } from 'react-icons/fa'

function ImprovedFaq() {
  const [openIndex, setOpenIndex] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const items = [
    {
      category: 'Products & Services',
      icon: '🛍️',
      questions: [
        {
          question: 'What services do you offer?',
          answer: 'We offer high-quality raw human hair wigs, bundles, lace fronts, hair care products, and professional styling tools. All our products are carefully curated to ensure premium quality and customer satisfaction.',
        },
        {
          question: 'Are your hair products 100% human hair?',
          answer: 'Yes! We exclusively offer 100% virgin human hair products. Our hair is unprocessed, chemical-free, and sourced ethically, ensuring natural texture and longevity.',
        },
        {
          question: 'Do you offer custom wig installations?',
          answer: 'Yes, we provide professional wig installation and styling services. Our experienced stylists can customize wigs to perfectly match your preferences and face shape.',
        },
      ]
    },
    {
      category: 'Orders & Shipping',
      icon: '📦',
      questions: [
        {
          question: 'How do I track my order?',
          answer: 'You can track your order by logging into your account or contacting our customer support team via WhatsApp or phone. You\'ll receive tracking information once your order ships.',
        },
        {
          question: 'How long does delivery take?',
          answer: 'Delivery within Port Harcourt takes 1-2 business days. Other locations in Nigeria typically receive orders within 3-5 business days. Express delivery options are available.',
        },
        {
          question: 'Do you offer international shipping?',
          answer: 'Currently, we ship within Nigeria only. However, we\'re working on expanding our shipping options to serve international customers soon.',
        },
      ]
    },
    {
      category: 'Returns & Refunds',
      icon: '↩️',
      questions: [
        {
          question: 'What is your return policy?',
          answer: 'We offer a 48-hour return and exchange policy. To be eligible for a refund, your item must be in its original condition and accompanied by all original tags, packaging, and accessories. Please see our full policy on our Instagram page.',
        },
        {
          question: 'How do I initiate a return?',
          answer: 'Contact us within 48 hours of receiving your order via WhatsApp (+234 812 561 7018) or visit our store. Our team will guide you through the return process.',
        },
        {
          question: 'Are there items that cannot be returned?',
          answer: 'For hygiene reasons, certain items like used hair care products or installed wigs cannot be returned. Custom-made or specially ordered items are also non-returnable unless defective.',
        },
      ]
    },
    {
      category: 'Payment & Pricing',
      icon: '💳',
      questions: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept major credit cards (Visa, Mastercard) via Paystack, bank transfers, and cash on delivery for local orders in Port Harcourt.',
        },
        {
          question: 'Do you offer discounts?',
          answer: 'Yes! We offer occasional discounts and promotions. Follow us on Instagram (@bclassy_hairs) and TikTok to stay updated on our latest deals and special offers.',
        },
        {
          question: 'Can I get a custom quote for bulk orders?',
          answer: 'Absolutely! For bulk orders or wholesale inquiries, please contact us directly via phone or WhatsApp for personalized pricing and package deals.',
        },
      ]
    },
    {
      category: 'Hair Care',
      icon: '✨',
      questions: [
        {
          question: 'How do I care for my wig or hair bundle?',
          answer: 'Wash with sulfate-free shampoo, condition regularly, and air dry when possible. Store on a wig stand, avoid excessive heat, and use our recommended hair care products for best results.',
        },
        {
          question: 'How long do your hair products last?',
          answer: 'With proper care, our virgin human hair can last 1-2 years or longer. Lifespan depends on maintenance, frequency of use, and styling practices.',
        },
      ]
    },
  ]

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const filteredItems = items.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0)

  return (
    <Wrapper id='faq'>
      <HeaderSection data-aos="fade-up">
        <IconWrapper>
          <BsQuestionCircleFill />
        </IconWrapper>
        <MainTitle>Frequently Asked Questions</MainTitle>
        <Subtitle>
          Have questions? We're here to help! Check out our frequently asked questions below.
        </Subtitle>
      </HeaderSection>

      <SearchContainer data-aos="fade-up" data-aos-delay="100">
        <SearchIcon>🔍</SearchIcon>
        <SearchInput
          type="text"
          placeholder="Search for answers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <ClearButton onClick={() => setSearchQuery('')}>✕</ClearButton>
        )}
      </SearchContainer>

      <FAQContainer>
        {filteredItems.length > 0 ? (
          filteredItems.map((category, catIndex) => (
            <CategorySection 
              key={catIndex}
              data-aos="fade-up" 
              data-aos-delay={catIndex * 50}
            >
              <CategoryHeader>
                <CategoryIcon>{category.icon}</CategoryIcon>
                <CategoryTitle>{category.category}</CategoryTitle>
              </CategoryHeader>

              <QuestionsContainer>
                {category.questions.map((faq, qIndex) => {
                  const globalIndex = `${catIndex}-${qIndex}`
                  const isOpen = openIndex === globalIndex

                  return (
                    <QuestionCard key={qIndex} $isOpen={isOpen}>
                      <QuestionButton onClick={() => toggleQuestion(globalIndex)}>
                        <QuestionText>{faq.question}</QuestionText>
                        <ChevronIcon $isOpen={isOpen}>
                          <BsChevronDown />
                        </ChevronIcon>
                      </QuestionButton>

                      <AnimatePresence>
                        {isOpen && (
                          <AnswerContainer
                            as={motion.div}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Answer>{faq.answer}</Answer>
                          </AnswerContainer>
                        )}
                      </AnimatePresence>
                    </QuestionCard>
                  )
                })}
              </QuestionsContainer>
            </CategorySection>
          ))
        ) : (
          <NoResults>
            <NoResultsIcon>🔍</NoResultsIcon>
            <NoResultsText>No questions found matching your search.</NoResultsText>
            <NoResultsSubtext>Try different keywords or browse all categories.</NoResultsSubtext>
          </NoResults>
        )}
      </FAQContainer>

      <CTASection data-aos="fade-up">
        <CTACard>
          <CTAIcon>
            <BsLightningChargeFill />
          </CTAIcon>
          <CTAContent>
            <CTATitle>Still have questions?</CTATitle>
            <CTAText>Can't find the answer you're looking for? Our customer support team is here to help.</CTAText>
            <CTAButtons>
              <WhatsAppButton href="https://wa.me/+2348125617018" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp /> WhatsApp Us
              </WhatsAppButton>
              <CallButton href="tel:+2348125617018">
                Call Now
              </CallButton>
            </CTAButtons>
          </CTAContent>
        </CTACard>
      </CTASection>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  padding: 80px 24px;
  background: linear-gradient(180deg, #ffffff 0%, #fef5f8 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 800px;
    height: 800px;
    background: radial-gradient(circle, rgba(102, 126, 234, 0.05), transparent 70%);
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 60px 16px;
  }
`

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 48px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
`

const IconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  color: white;
  font-size: 2rem;
  margin-bottom: 24px;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
`

const MainTitle = styled.h2`
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #fc5c7d 0%, #6a82fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const SearchContainer = styled.div`
  position: relative;
  max-width: 600px;
  margin: 0 auto 48px;
`

const SearchIcon = styled.span`
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
`

const SearchInput = styled.input`
  width: 100%;
  padding: 16px 60px 16px 56px;
  border: 2px solid #e2e8f0;
  border-radius: 50px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #a0aec0;
  }
`

const ClearButton = styled.button`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  background: #e2e8f0;
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  color: #4a5568;

  &:hover {
    background: #cbd5e0;
  }
`

const FAQContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
`

const CategorySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
`

const CategoryIcon = styled.span`
  font-size: 1.8rem;
`

const CategoryTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3748;
  margin: 0;
`

const QuestionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const QuestionCard = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 2px solid ${props => props.$isOpen ? '#667eea' : 'transparent'};

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
`

const QuestionButton = styled.button`
  width: 100%;
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(102, 126, 234, 0.05);
  }
`

const QuestionText = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d3748;
  padding-right: 16px;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const ChevronIcon = styled.span`
  font-size: 1.2rem;
  color: #667eea;
  transition: transform 0.3s ease;
  transform: rotate(${props => props.$isOpen ? '180deg' : '0deg'});
  flex-shrink: 0;
`

const AnswerContainer = styled.div`
  overflow: hidden;
`

const Answer = styled.div`
  padding: 0 24px 20px;
  font-size: 1rem;
  line-height: 1.7;
  color: #4a5568;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`

const NoResults = styled.div`
  text-align: center;
  padding: 60px 20px;
`

const NoResultsIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 16px;
`

const NoResultsText = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 8px;
`

const NoResultsSubtext = styled.p`
  font-size: 1rem;
  color: #718096;
`

const CTASection = styled.div`
  margin-top: 64px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    margin-top: 48px;
  }
`

const CTACard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 24px;
  padding: 48px;
  display: flex;
  align-items: center;
  gap: 32px;
  box-shadow: 0 20px 60px rgba(102, 126, 234, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1), transparent);
    border-radius: 50%;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 32px 24px;
    gap: 24px;
    text-align: center;
  }
`

const CTAIcon = styled.div`
  width: 80px;
  height: 80px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: #667eea;
  flex-shrink: 0;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    width: 64px;
    height: 64px;
    font-size: 2rem;
  }
`

const CTAContent = styled.div`
  flex: 1;
  position: relative;
  z-index: 1;
`

const CTATitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 800;
  color: white;
  margin: 0 0 8px 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`

const CTAText = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.95);
  margin: 0 0 24px 0;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const CTAButtons = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`

const WhatsAppButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 32px;
  background: #25D366;
  color: white;
  font-weight: 600;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    background: #20bd5a;
  }
`

const CallButton = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 14px 32px;
  background: white;
  color: #667eea;
  font-weight: 600;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    background: #f7fafc;
  }
`

export default ImprovedFaq