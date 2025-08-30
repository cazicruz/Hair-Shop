"use client";
import React from 'react';
import styled from 'styled-components';
import { useThemeContext } from '../lib/theme-provider';
import { FloatButton } from "antd";
import { MdDarkMode } from "react-icons/md";
import { BsBrightnessHigh } from "react-icons/bs";



const ToggleButton = styled.button`
    padding: 8px 16px;
    border: #fff solid 1px;
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text};
    cursor: pointer;
    transition: background 0.3s ease, color 0.3s ease;
    &:hover {
        background: ${({ theme }) => theme.colors.secondary};
        color: ${({ theme }) => theme.colors.text};
    }
`;

export default function ThemeToggle() {
    const { isDarkMode, toggleTheme } = useThemeContext();

    return (
        <FloatButton 
        tooltip={`Switch ${isDarkMode ? 'Light' : 'Dark'} Mode`}
        icon={isDarkMode ? <MdDarkMode /> : <BsBrightnessHigh />}
        style={{  backgroundColor: isDarkMode ? '#333' : '#fff', color: isDarkMode ? '#fff' : '#333', insetInlineEnd: 30, border: 'none' }}
        type="primary"
        onClick={toggleTheme}>
            {/* Switch to {isDarkMode ? 'Light' : 'Dark'} Mode */}
        </FloatButton>
    );
}
