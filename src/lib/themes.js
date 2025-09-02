// themes.js
export const lightTheme = {
    colors: {
        primary: '#E75480', // Pink
        secondary: '#FFD1DC', // Light Pink
        accent: '#A569BD', // Lavender
        background: '#f8fcffff', // Soft white
        text: '#2D2D2D', // Dark gray
        muted: '#F6EAF5', // Muted pink
        border: '#F3C6D3', // Light border
        shadow: '#bfa7c8a9',
    },
    fonts: {
        heading: '"Playfair Display", serif',
        body: '"Montserrat", Arial, sans-serif',
    },
    fontSize: {
        xxsmall:'0.625rem',
        xsmall: '0.75rem',
        small: '0.875rem',
        medium: '1rem',
        large: '1.125rem',
        xlarge: '1.25rem',
        xxlarge: '1.5rem',
        big:'2rem',
    },
    borderRadius:{
        sharpCurve:'5px',
        normalCurve:'8px',
        bigCurve: '12px',
    },
    spacing: (factor) => `${factor * 8}px`,
};

export const darkTheme = {
    colors: {
        primary: '#A569BD', // Purple
        secondary: '#2C2C2C', // Dark Gray
        accent: '#E75480', // Pink accent
        background: '#515457ff', // Deep black
        text: '#FFFFFF', // White text
        muted: '#2D2D2D', // Muted dark gray
        border: '#3C3C3C', // Dark border
        shadow: '#c7758e9d',
    },
    fonts: {
        heading: '"Playfair Display", serif',
        body: '"Montserrat", Arial, sans-serif',
    },
    fontSize: {
        xxsmall:'0.625rem',
        xsmall: '0.75rem',
        small: '0.875rem',
        medium: '1rem',
        large: '1.125rem',
        xlarge: '1.25rem',
        xxlarge: '1.5rem',
        big:'2rem',
    },
    borderRadius:{
        sharpCurve:'5px',
        normalCurve:'8px',
        bigCurve: '12px',
    },
    spacing: (factor) => `${factor * 8}px`,
};
