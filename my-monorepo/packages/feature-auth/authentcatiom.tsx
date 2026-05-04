'use client';

import { useState } from 'react';
import { Input, Button, Card } from 'ui';

export const Auth = () => {
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
    <Card>
      <h2>{mode === 'login' ? 'Login' : 'Register'}</h2>

      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />

      <br />

      <Input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />

      <br />

      <Button onClick={handleSubmit}>
        {mode === 'login' ? 'Login' : 'Register'}
      </Button>

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