export const dynamic = 'force-dynamic';

import React,{Suspense} from 'react';
import LoginForm from '@/components/modals/LoginForm';
import { HeaderText } from '@/components/home/Latest';

export default function UsersPage() {
  return (
    <div>
      <h2>B-classy</h2>
      <HeaderText>Admin Login</HeaderText>
          <Suspense fallback={<div>Loading...</div>}>
      <LoginForm openModal={true} 
      />
      </Suspense>
    </div>
  );
}