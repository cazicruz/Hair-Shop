'use client';
import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from 'antd';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const Container = styled.div`
  max-width: 400px;
  margin: 40px auto;
  padding: 24px;
  border: 1px solid #eee;
  border-radius: ${(props) => props.radius};
  background: ${(props) => props.bg};
`;

const Title = styled.h2`
  margin-bottom: 24px;
  font-size: 24px;
  font-weight: 600;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 16px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`;

const Button = styled.button`
  padding: 10px 16px;
  background-color: ${(props) => props.primary};
  color: #fff;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  .spinner {
    margin-left: 8px;
    border: 2px solid #fff;
    border-top: 2px solid transparent;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    animation: spin 0.6s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;


const ErrorText = styled.div`
  color: red;
  margin-top: 16px;
`;

const LoadingText = styled.div`
  margin-top: 16px;
  font-style: italic;
`;

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const {
    token: { colorBgContainer, colorPrimary, borderRadiusLG },
  } = theme.useToken();

  const sendOtp = async (email) => new Promise((resolve) => setTimeout(resolve, 1000));
  const verifyOtp = async (email, otp) =>
    new Promise((resolve, reject) => setTimeout(() => (otp === '123456' ? resolve() : reject()), 1000));
  const updatePassword = async (email, newPassword) => new Promise((resolve) => setTimeout(resolve, 1000));
  const signIn = async (email, password) => new Promise((resolve) => setTimeout(resolve, 1000));

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await sendOtp(email);
      toast.success('OTP sent to your email!', { className: 'toast-success' });
      setStep(2);
    } catch {
      setError('Failed to send OTP. Try again.');
      toast.error('Failed to send OTP. Try again.', { className: 'toast-error' });
    }
    setLoading(false);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await verifyOtp(email, otp);
      toast.success('OTP verified successfully!', { className: 'toast-success' });
      setStep(3);
    } catch {
      setError('Invalid OTP. Try again.');
      toast.error('Invalid OTP. Try again.', { className: 'toast-error' });
    }
    setLoading(false);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      toast.error('Passwords do not match.', { className: 'toast-error' });
      setLoading(false);
      return;
    }
    try {
      await updatePassword(email, newPassword);
      await signIn(email, newPassword);
      router.push('/products');
      toast.success('Password updated and signed in successfully!', { className: 'toast-success' });
      setStep(4);
    } catch {
      setError('Failed to update password. Try again.');
      toast.error('Failed to update password. Try again.', { className: 'toast-error' });
    }
    setLoading(false);
  };

  return (
    <Container bg={colorBgContainer} radius={borderRadiusLG}>
      <Title>Forgot Password</Title>

      {step === 1 && (
        <Form onSubmit={handleEmailSubmit}>
          <Label>
            Email:
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </Label>
          <Button type="submit" disabled={loading} primary={colorPrimary}>
            Send OTP
            {loading && <span className="spinner" />}
          </Button>
        </Form>
      )}

      {step === 2 && (
        <Form onSubmit={handleOtpSubmit}>
          <Label>
            Enter OTP sent to your email:
            <Input
              type="text"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              disabled={loading}
            />
          </Label>
          <Button type="submit" disabled={loading} primary={colorPrimary}>
            Verify OTP
            {loading && <span className="spinner" />}
          </Button>
        </Form>
      )}

      {step === 3 && (
        <Form onSubmit={handlePasswordSubmit}>
          <Label>
            New Password:
            <Input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={loading}
            />
          </Label>
          <Label>
            Confirm Password:
            <Input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
            />
          </Label>
          <Button type="submit" disabled={loading} primary={colorPrimary}>
            Update Password
            {loading && <span className="spinner" />}
          </Button>
        </Form>
      )}

      {step === 4 && <p>Password updated and signed in successfully!</p>}
      {error && <ErrorText>{error}</ErrorText>}
      {loading && <LoadingText>Processing...</LoadingText>}
    </Container>
  );
}
