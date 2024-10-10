import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Register } from '../services/authService';

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain a special character')
    .required('Password is required'),
});

const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
  
    try {
      await Register(data);
      alert('Registration successful');
      // Redirect to another page or do something after registration
    } catch (error) {
      console.log(error);
      console.log('dil');
      alert('Error registering');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('username')} placeholder="Username" />
      <p>{errors.username?.message}</p>

      <input {...register('email')} placeholder="Email" />
      <p>{errors.email?.message}</p>

      <input {...register('password')} type="password" placeholder="Password" />
      <p>{errors.password?.message}</p>

      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
