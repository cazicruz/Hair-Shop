'use client';
import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { useRouter } from 'next/navigation';  
import useAuth from '@/hooks/useAuth';

function LoginForm() {
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { login, register } = useAuth();
  const router = useRouter();

  // Open modal after component mounts (fixes hydration issue)
  useEffect(() => {
    setOpenModal(true);
  }, []);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      if (isSignUp) {
        await register(values);
      } else {
        await login(values);
      }
      // setOpenModal(false);
    } catch (error) {
      console.error(`${isSignUp ? 'Sign Up' : 'Login'} failed:`, error);
      // Show the user a friendly error message (login mutation already normalizes errors,
      // but guard here as well in case something else throws)
      const message = error?.message || (error?.response?.data?.message) || 'Authentication failed. Please try again.';
      // Use react-toastify if available via the project; fallback to alert if not
      try {
        // import dynamically to avoid bundling issues in some environments
        const { toast } = await import('react-toastify');
        toast.error(message, { className: 'toast-error' });
      } catch (e) {
        alert(message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onFinish = async (values) => {
    console.log(`${isSignUp ? 'Sign Up' : 'Login'} values:`, values);
    await handleSubmit(values);
  };

  const handleCancel = () => {
    setOpenModal(false);
    // Optionally redirect back to home or previous page
    router.push('/');
  };

  return (
    <Modal
      title={isSignUp ? 'Sign Up' : 'Login'}
      open={openModal}
      confirmLoading={isLoading}
      // onCancel={handleCancel}
      footer={null}
      // destroyOnHidden
    >
      <Form
        name="auth_form"
        layout="vertical"
        onFinish={onFinish}
        requiredMark={false}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
        >
          <Input placeholder="you@example.com" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password placeholder="Enter password" />
        </Form.Item>

        {isSignUp && (
          <>
            <Form.Item
              label="Full Name"
              name="name"
              rules={[
                { required: true, message: 'Please enter your full name' },
              ]}
            >
              <Input placeholder="John Doe" />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Please confirm your password' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Passwords do not match'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm password" />
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[
                { required: true, message: 'Please enter your phone number' },
              ]}
            >
              <Input placeholder="+234..." />
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[
                { required: true, message: 'Please enter your address' },
              ]}
            >
              <Input.TextArea placeholder="Your address" rows={3} />
            </Form.Item>
          </>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading} block>
            {isSignUp ? 'Sign Up' : 'Login'}
          </Button>
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Button 
            type="link" 
            onClick={() => setIsSignUp(!isSignUp)} 
            block
            style={{ padding: 0 }}
          >
            {isSignUp ? 'Already have an account? Login' : 'New user? Sign Up'}
          </Button>
        </Form.Item>
      </Form>

      {!isSignUp && (
        <div
          style={{ 
            textAlign: 'center', 
            cursor: 'pointer', 
            color: '#1890ff',
            marginTop: '8px' 
          }}
          onClick={() => {
            setOpenModal(false);
            router.push('/forgotPassword');
          }}
        >
          Forgot Password?
        </div>
      )}
    </Modal>
  );
}

export default LoginForm;