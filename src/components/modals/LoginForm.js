'use client';
import React, { useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { useRouter } from 'next/navigation';  

function LoginForm({ openModal, setOpenModal }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const router = useRouter();



  const onFinish = values => {
    setIsLoading(true);
    console.log(`${isSignUp ? 'Sign Up' : 'Login'} values:`, values);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setOpenModal(false);
    }, 1500);
  };

  return (
    <Modal
      title={isSignUp ? 'Sign Up' : 'Login'}
      open={openModal}
      confirmLoading={isLoading}
      onCancel={() => setOpenModal(false)}
      footer={null}
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
              <Input.TextArea placeholder="Your address" />
            </Form.Item>
          </>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading} block>
            {isSignUp ? 'Sign Up' : 'Login'}
          </Button>
        </Form.Item>

        <Form.Item>
          <Button type="link" onClick={() => setIsSignUp(!isSignUp)} block>
            {isSignUp ? 'Already have an account? Login' : 'New user? Sign Up'}
          </Button>
        </Form.Item>
      </Form>
      
      {/* <div
      style={{ textAlign: 'center', cursor: 'pointer', color: '#1890ff' }}
      onClick={() => setIsSignUp(!isSignUp)}
      > {isSignUp ? 'Already have an account? Login' : 'New user? Sign Up'}</div> */}

      <div
      style={{ textAlign: 'center', cursor: 'pointer', color: '#1890ff' }}
      onClick={() => {
        setOpenModal(false);
        router.push('/forgotPassword');
      }}
      >Forgot Password?</div>
    </Modal>
  );
}

export default LoginForm;
