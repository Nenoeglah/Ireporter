

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    // You can access the email and password here
    console.log('Email:', email);
    console.log('Password:', password);

    // Make an API request with the form data (email and password)
    fetch('/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((r) => {
        if (r.ok) {
          r.json().then((user) => {
            setIsLoading(false);
            onLogin(user);
            navigate('/dashboard');
          });
        } else {
          setIsLoading(false);
          r.json().then((err) => setErrors([err.errors]));
        }
      });
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-holder">
        <form onSubmit={handleSubmit}>
          <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
            <h2 style={{ textAlign: 'center' }}>Admin Login</h2>
          </Link>
          <div style={{ textAlign: 'center' }}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div style={{ textAlign: 'center' }}>
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div style={{ textAlign: 'center' }}>
            <input
              type="submit"
              value={isLoading ? 'Logging you in...' : 'Login'}
            />
          </div>
          <div>
            {errors.map((error) => (
              <p key={error} style={{ color: 'red', textAlign: 'center' }}>
                {error}
              </p>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
