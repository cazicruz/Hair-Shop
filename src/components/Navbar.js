'use client';
import React, { useState } from 'react';
import styled from 'styled-components';
import { FaOpencart } from 'react-icons/fa';
import { RiAccountPinCircleFill } from "react-icons/ri";
import Link from 'next/link';
import Tooltip from '@/components/UI/Tooltip';
import { BsStars } from "react-icons/bs";


const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: "FAQ's", href: '/faq' },
];

const NavbarContainer = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: linear-gradient(42deg,rgba(252, 176, 69, 1) 0%, rgba(253, 29, 29, 1) 77%, rgba(121, 0, 201, 1) 7%);
    padding: 0.75rem 2rem;
    position: relative;
    font-family: sans-serif;
    box-shadow: 0 2px 8px rgba(0,0,0,0.07);
`;

const Logo = styled.div`
    font-weight: bold;
    font-size: 1.5rem;
    color: #fff;
    letter-spacing: 2px;
`;

const LinksDesktop = styled.div`
    display: flex;
    align-items: center;
    gap: 1.5rem;

    @media (max-width: 768px) {
        display: none;
    }
`;

const NavLink = styled.div`
    color: #fff;
    text-decoration: none;
    font-weight: 500;
    font-size: 1rem;
    transition: color 0.2s;

    &:hover {
        color: #f8cdda;
    }
`;

const CartLink = styled.a`
    color: #fff;
    font-size: 1.2rem;
    margin-left: 1rem;
    text-decoration: none;
`;

const AccountLink = styled.a`
    color: #fff;
    font-size: 1.2rem;
    margin-left: 0.5rem;
    text-decoration: none;
`;

const MenuButton = styled.button`
    display: none;
    background: none;
    border: none;
    color: #dededeff;
    cursor: pointer;

    @media (max-width: 768px) {
        display: block;
    }
`;

const LinksMobile = styled.div`
    position: absolute;
    height : auto;
    width: auto;
    top: 100%;
    right: 0;
    background: #fff;
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
    display: flex;
    flex-direction: column;
    width: 180px;
    z-index: 100;
    border-radius: 0 0 8px 8px;
    overflow: hidden;

    @media (min-width: 769px) {
        display: none;
    }
`;

const NavLinkMobile = styled.a`
    padding: 1rem;
    color: #1d2b64;
    text-decoration: none;
    border-bottom: 1px solid #f0f0f0;
    font-weight: 500;
    font-size: 1rem;
    background: #e8e8e8ff;
    transition: background 0.2s;

    &:hover {
        background: #f8cdda;
    }
`;

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <NavbarContainer>
            <Logo>
                <span role="img" aria-label="B-Classy hair shop"></span> B-Classy <BsStars color="gold"/>
            </Logo>
            <LinksDesktop>
                {navLinks.map(link => (
                    <NavLink key={link.name} >
                        <Link href={link.href} >{link.name}</Link>
                    </NavLink>
                ))}
                <CartLink href="/cart">
                    <Tooltip text='Cart' position='bottom'>
                        <span role="img" aria-label="cart"><FaOpencart size={23}/></span>
                    </Tooltip>
                </CartLink>
                <AccountLink href="/account">
                    <Tooltip text='Account' position='bottom'>
                        <span role="img" aria-label="account"><RiAccountPinCircleFill /></span>
                    </Tooltip>
                </AccountLink>
            </LinksDesktop>
            <MenuButton
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                <span style={{ fontSize: 24 }}>☰</span>
            </MenuButton>
            {menuOpen && (
                <LinksMobile>
                    {navLinks.map(link => (
                        <NavLinkMobile key={link.name} href={link.href} onClick={() => setMenuOpen(false)}>
                            {link.name}
                        </NavLinkMobile>
                    ))}
                    <NavLinkMobile href="/cart" onClick={() => setMenuOpen(false)}>
                        Cart <FaOpencart />
                    </NavLinkMobile>
                    <NavLinkMobile href="/account" onClick={() => setMenuOpen(false)}>
                        Account
                    </NavLinkMobile>
                </LinksMobile>
            )}
        </NavbarContainer>
    );
}