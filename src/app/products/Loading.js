import React from 'react';

const Loading = () => {
    return (
        <div className="loading-container" style={{ padding: '2rem', textAlign: 'center' }}>
            <div className="spinner" style={{
                margin: '0 auto 1rem',
                width: '48px',
                height: '48px',
                border: '6px solid #eee',
                borderTop: '6px solid #333',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
            }} />
            <p>Loading products...</p>
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg);}
                    100% { transform: rotate(360deg);}
                }
            `}</style>
        </div>
    );
};

export default Loading;