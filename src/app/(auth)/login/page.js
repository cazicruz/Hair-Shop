'use client';
import React, { useState,Suspense } from 'react';
import LoginForm from '@/components/modals/LoginForm';

export default function AuthPage() {
  const [openModal, setOpenModal] = useState(true);

  

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <Suspense fallback={<div>Loading...</div>}>
        {<LoginForm openModal={true} setOpenModal={() => {}} />}

      </Suspense>
    </div>
  );
}
