'use client';
import React, { useState,useEffect } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { FaOpencart } from 'react-icons/fa';
import { RiAccountPinCircleFill } from "react-icons/ri";
import Link from 'next/link';
import Tooltip from '@/components/UI/Tooltip';
import { BsStars } from "react-icons/bs";
// import LoginForm from '@/components/modals/LoginForm'
import { Badge } from 'antd';
import { useSelector } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';
import {extractNameFromEmail} from '@/utils/helpers';
import useAuth from '@/hooks/useAuth';
import { HiOutlineLogout } from "react-icons/hi";



const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/products' },
    { name: 'About', href: '/#about' },
    { name: 'Contact', href: '/#contact' },
    { name: "FAQ's", href: '/#faq' },
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
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0;
    margin: 0;
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

const AccountLink = styled.div`
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
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
    }
`;
const Hamburger = styled.div`
  width: 24px;
  height: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;

  span {
    display: block;
    height: 3px;
    width: 100%;
    background: #fff;
    border-radius: 3px;
    transition: all 0.3s ease-in-out;
  }

  /* When open, transform into X */
  &.open span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }
  &.open span:nth-child(2) {
    opacity: 0;
  }
  &.open span:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
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
    transform: ${({ open }) => (open ? 'scaleY(1)' : 'scaleY(0)')};
    transform-origin: top;
    transition: transform 0.01s ease-in-out;

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
    const [openModal,setOpenModal] = useState(false);
    const cart = useSelector((state) => state.cart.items);
    const [cartCount,setCartCount]=useState(cart.length)
    const toggleMenu = () => setMenuOpen(!menuOpen);

    const {logout} = useAuth();

    const queryClient = useQueryClient();
    const user = queryClient.getQueryData(['user']);

    const userName =  extractNameFromEmail(user?.email);

    const handleLogOut = () => {
        logout();
    };

    useEffect(() => {
        setCartCount(cart.length);
    }, [cart]);

    return (
        <NavbarContainer>
            <Logo>
                    <Image src="/favicon.png" alt="B-Classy Hair Shop Logo" width={40} height={40} style={{marginBottom:'5px', borderRadius:'5px'}}/>
            </Logo>
            <LinksDesktop>
                {navLinks.map(link => (
                    <NavLink key={link.name} >
                        <Link href={link.href} >{link.name}</Link>
                    </NavLink>
                ))}
                <CartLink href="/cart">
                        <Badge 
                        count={cartCount} 
                        overflowCount={10} 
                        size="small" 
                        title={`${cartCount} items in cart`}>
                    <Tooltip text={"Cart"} position='bottom'>
                            <span role="img" aria-label="cart"><FaOpencart size={23} color='#fff'/></span>
                    </Tooltip>
                        </Badge>
                </CartLink>
                {/* Assuming a simple loggedIn state for demonstration */}
                <Link href={user ? "/orders" :'/login'}>
                <AccountLink href={user ? "/orders" :'/login'}>
                    <Tooltip text={user ? `${userName?.firstName} ${userName?.lastName}'s Account` : 'Login'} position='bottom'>
                        <span role="img" aria-label={user ? `${userName?.firstName} ${userName?.lastName}'s Account` : 'Login / Sign Up'}
                        onClick={()=>setOpenModal(true)}
                        ><RiAccountPinCircleFill size={23} /></span>
                    </Tooltip>
                    {/* <LoginForm 
                    setOpenModal={setOpenModal}
                    openModal={openModal}
                      /> */}
                </AccountLink>
                </Link>
                {user && 
                <AccountLink href="#" onClick={handleLogOut} style={{marginLeft:'5px', cursor:'pointer'}}>
                    <HiOutlineLogout size={23} title="Logout" color="#fff" />
                </AccountLink>}
            </LinksDesktop>
            <MenuButton>
                <CartLink href="/cart">
                        <Badge 
                        count={cartCount} 
                        overflowCount={10} 
                        size="small" 
                        title={`${cartCount} items in cart`}>
                    <Tooltip text={"Cart"} position='bottom'>
                            <span role="img" aria-label="cart"><FaOpencart size={30} color='#fff'/></span>
                    </Tooltip>
                        </Badge>
                </CartLink>
                <Hamburger 
                onClick={toggleMenu}
                aria-label="Toggle menu"
                className={menuOpen ? "open" : ""}>
                    <span></span>
                    <span></span>
                    <span></span>
                </Hamburger>
            </MenuButton>
            {menuOpen && (
                <LinksMobile open={menuOpen} 
                data-aos="fade-down" 
                data-aos-easing="linear"
                data-aos-duration="1500">
                    {navLinks.map(link => (
                        <NavLinkMobile key={link.name} href={link.href} onClick={() => setMenuOpen(false)}>
                            {link.name}
                        </NavLinkMobile>
                    ))}
                    {/* <NavLinkMobile href="/cart" onClick={() => setMenuOpen(false)}>
                        Cart <FaOpencart />
                    </NavLinkMobile> */}
                    <NavLinkMobile href={user ? "/orders" :'/login'} onClick={() => {
                        setMenuOpen(false)
                        setOpenModal(true)
                        
                        }}>
                        {user
                            ? (user.fullName
                                ? user.fullName
                                : `${userName?.firstName ?? ''} ${userName?.lastName ?? ''}'s Orders`)
                            : 'Login / Sign Up'}

                    </NavLinkMobile>
                    {user &&<NavLinkMobile href="/" onClick={() => {
                        setMenuOpen(false)
                        setOpenModal(true)
                        handleLogOut();
                        }}>
                            Logout
                    </NavLinkMobile>}
                </LinksMobile>
            )}
        </NavbarContainer>
    );
}