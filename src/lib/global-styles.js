'use client';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: Arial, sans-serif;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    transition: background 0.3s ease, color 0.3s ease;
  }
    a {
        color: inherit;
        text-decoration: none;
    }
    ul {
        list-style: none;
    }
    button {
        font-family: inherit;
    }
    h1{
        font-size: 2.5rem;
        margin-bottom: 1rem;
        color: ${({ theme }) => theme.colors.text};
    }
    h2{
        font-size: 1.5rem;
        margin-bottom: 0.75rem;
        color: ${({ theme }) => theme.colors.text};
    }
    h3{
        font-size: 1.0rem;
        margin-bottom: 0.5rem;
        color: ${({ theme }) => theme.colors.text};
    }
    p{
        font-size: 0.8rem;
        margin-bottom: 0.5rem;
        color: ${({ theme }) => theme.colors.text};
    }
`;
