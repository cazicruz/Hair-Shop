'use client';
import React, { createContext, useContext, useMemo, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './global-styles';
import { lightTheme, darkTheme } from './themes';

const ThemeContext = createContext();

export function useThemeContext() {
    return useContext(ThemeContext);
}

export default function StyledComponentsThemeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(false);


    const toggleTheme = () => setIsDarkMode((prev) => !prev);

    const currentTheme = isDarkMode ? darkTheme : lightTheme;

    
    const value = useMemo(
        () => ({ currentTheme, isDarkMode, toggleTheme }),
        [isDarkMode,currentTheme]
    );

    return (
        <ThemeContext.Provider value={value}>
            <ThemeProvider theme={value.currentTheme}>
                <GlobalStyle />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}
