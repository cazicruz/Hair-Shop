"use client";
import React from 'react';
import styled from 'styled-components';
import { useThemeContext } from '../lib/theme-provider';

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
        <ToggleButton onClick={toggleTheme}>
            Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
        </ToggleButton>
    );
}
