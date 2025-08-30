'use client';
import React, { useState } from 'react';
import styled from 'styled-components';
import ThemeToggle from './ThemeToggle';
import { FaMapMarkerAlt, FaStore, FaPhone, FaInstagram, FaTwitter, FaFacebook, FaXTwitter, FaWhatsapp } from 'react-icons/fa';
import Link from 'next/link'
import SocialBox from './SocialBox';




const FooterContainer = styled.footer`
  width: 100%;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  padding: 2rem 1rem;
  transition: all 0.3s ease;

  .footer-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;

    @media (min-width: 768px) {
      flex-direction: row;
      justify-content: space-between;
      text-align: left;
    }
  }

  h3 {
    margin-bottom: 0.5rem;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 0.5rem;

      a {
        color: ${({ theme }) => theme.link};
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
    .SocialBox {
      display: none;
    }
  }

  
`;
const FooterElement = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  padding: 1rem;
  border-right: 1px solid #eee;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-right: none;
  }
  @media (min-width: 768px) {
    border-right: 1px solid #eee;
  }

  &:last-child {
    border-right: none;
  }
`;
// const Wrapper = styled.div`
//     display: flex;

// `

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <FooterContainer>
      <div className="footer-content">
        <FooterElement >
          <div><FaStore size={60} /></div>
          <h3>STORE INFORMATION</h3>
          <p>Visit us at our physical locations for premium hair products.</p>
          <p><FaMapMarkerAlt /> <strong>Address:</strong> fillme pls</p>
          <SocialBox />
        </FooterElement>

        <FooterElement>
          <h3>ONLINE STORE INFORMATION</h3>
          <p><strong>OPENING HOURS</strong></p>
          <ul>
            <li><p><strong>Monday</strong> - Friday: 8:00AM - 5:00PM</p></li>
            <li><p><strong>Saturday:</strong> 10:00AM - 3:00PM</p></li>
            <li><p><strong>Sunday:</strong> Closed</p></li>
            <li>
              {/* Replace helpline icon with phone icon */}
              
              <p>
                <span style={{ marginRight: '6px', verticalAlign: 'middle' }}>
                {/* Import FaPhone from react-icons/fa at the top */}
                <FaPhone />
              </span>
                <strong>:</strong> +234 708 470 4785</p>
            </li>
          </ul>
        </FooterElement>

        <FooterElement>
          <h3>Helpful Links</h3>
          <ul>
            <li><Link href="/about"><p>About Us</p></Link></li>
            <li><Link href="/contact"><p>Contact</p></Link></li>
            <li><Link href="/policy/trading"><p>Our Trading Policy</p></Link></li>
            <li><Link href="/policy/privacy"><p>Privacy Policy</p></Link></li>
            <li><Link href="/terms"><p>Terms of Service</p></Link></li>
            <li><Link href="/faq"><p>FAQ&rsquo;s</p></Link></li>
          </ul>
        </FooterElement>
      </div>

      {/* <ThemeToggle />    */}
      <hr />
      <div style={{ margin: '1rem 0' }}></div>
      <div>
        <p><strong><a href='https://cazicruz.github.io/portfolio/'>
          &copy; {currentYear} DavDev</a></strong>. All rights reserved.
          <br />
          This website and all its content are the exclusive property of DavDev. Any unauthorized copying, reproduction, or distribution of materials from this site is strictly forbidden. For licensing, permissions, or further inquiries, please contact DavDev directly. Thank you for respecting our intellectual property and supporting our work.
        </p>
      </div>
      <div>Designed and developed by <strong>DavDev</strong></div>
    </FooterContainer>
  );
};

export default Footer;
