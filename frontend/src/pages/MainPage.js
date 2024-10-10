import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import ForgotPasswordForm from '../components/ForgotPasswordForm';

const MainPage = () => {
  const [formType, setFormType] = useState('login'); // 'login', 'register', or 'forgot'

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>
        {formType === 'login' ? 'Login' : formType === 'register' ? 'Register' : 'Forgot Password'}
      </h1>

      {formType === 'login' && <LoginForm />}
      {formType === 'register' && <RegisterForm />}
      {formType === 'forgot' && <ForgotPasswordForm />}

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        {formType === 'login' ? (
          <>
            <button onClick={() => setFormType('register')}>Create an account</button>
            <br />
            <button onClick={() => setFormType('forgot')}>Forgot Password?</button>
          </>
        ) : formType === 'register' ? (
          <button onClick={() => setFormType('login')}>Already have an account?</button>
        ) : (
          <button onClick={() => setFormType('login')}>Back to Login</button>
        )}
      </div>
    </div>
  );
};

export default MainPage;
