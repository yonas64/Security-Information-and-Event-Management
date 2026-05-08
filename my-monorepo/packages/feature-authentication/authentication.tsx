"use client";

import React, { useState } from 'react';
import { Input, Card } from 'ui-components';

export const Auth: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (mode === 'login') {
      alert(`Logging in with ${email}`);
    } else {
      alert(`Registering ${email}`);
    }
  };

  return (
    <Card title={mode === 'login' ? 'Login' : 'Register'} href="#">

      <Input
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        placeholder="Email"
      />

      <br />

      <Input
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        placeholder="Password"
      />

      <br />

      <button onClick={handleSubmit}>{mode === 'login' ? 'Login' : 'Register'}</button>

      <br />

      <button
        onClick={() =>
          setMode(mode === 'login' ? 'register' : 'login')
        }
      >
        Switch to {mode === 'login' ? 'Register' : 'Login'}
      </button>
    </Card>
  );
};