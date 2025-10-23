export const dynamic = 'force-dynamic';

import React from 'react';
// import dynamic from 'next/dynamic';
import { HeaderText } from '@/components/home/Latest';

// Load LoginForm only on the client to avoid SSR/prerender errors from client-only libs (antd, react-toastify, etc.)
// const LoginForm = dynamic(() => import('@/components/modals/LoginForm'), { ssr: false });

export default function UsersPage() {
  return (
    <div>
      <h2>B-classy</h2>
      <HeaderText>Admin Login</HeaderText>
      <LoginForm openModal={true} />
    </div>
  );
}