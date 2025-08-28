import React from 'react';
import {  FaInstagram, FaTwitter, FaFacebook, FaWhatsapp } from 'react-icons/fa';
import { BsTwitterX } from "react-icons/bs";
import styled from 'styled-components';


const SocialBox = () => {
    return (
        <Social>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" >
                <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" >
                <FaTwitter />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" >
                <FaFacebook />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" >
                <BsTwitterX />
            </a>
            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" >
                <span><FaWhatsapp /></span>
            </a>
        </Social>
    );
};

const Social = styled.div`
    display: flex;
    gap: 10px;
    max-width: 200px;
    font-size: 1.5rem;
    height: 40px;
    alingn-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.text};
    border: 1px solid ${({ theme }) => theme.colors.text};
    border-radius: 8px;
    padding: 0.5rem;
    transition: all 0.3s ease;
    margin:5px;
    a {
        display: flex;
        align-items: center;
        color: ${({ theme }) => theme.colors.text};
        transition: color 0.3s;
        &:hover {
            color: ${({ theme }) => theme.colors.a};
        }
    }
`;
export default SocialBox;