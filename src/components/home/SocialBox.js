import React from 'react';
import {  FaInstagram, FaTwitter, FaFacebook, FaWhatsapp } from 'react-icons/fa';
import { BsTwitterX } from "react-icons/bs";
import styled from 'styled-components';
import { RiTiktokLine } from "react-icons/ri";


const SocialBox = () => {
    return (
        <Social>
            <a href="https://www.instagram.com/bclassy_hairs?igsh=b21uZ25rYXoxaGJ0" target="_blank" rel="noopener noreferrer" >
                <FaInstagram />
            </a>
            <a href="https://www.tiktok.com/@bclassy_hairs?_t=ZS-90ja5wFewYp&_r=1" target="_blank" rel="noopener noreferrer" >
                <RiTiktokLine />
            </a>
            <a href="https://www.facebook.com/share/16X5mzpkSk/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" >
                <FaFacebook />
            </a>
            {/* <a href="https://x.com" target="_blank" rel="noopener noreferrer" >
                <BsTwitterX />
            </a> */}
            <span>
                <a href="https://wa.me/+2348125617018" target="_blank" rel="noopener noreferrer" >
                    <span><FaWhatsapp /></span>
                </a>
            </span>
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