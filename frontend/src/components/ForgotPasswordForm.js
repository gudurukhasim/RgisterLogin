import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { forgotPassword } from '../services/authService';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
});

const ForgotPasswordForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await forgotPassword(data.email);
      alert('If the email is registered, you will receive a reset link shortly.');
    } catch (error) {
      alert('Error sending reset email');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} placeholder="Email" />
      <p>{errors.email?.message}</p>
      <button type="submit">Send Reset Link</button>
    </form>
  );
};

export default ForgotPasswordForm;
