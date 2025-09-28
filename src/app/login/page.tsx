'use client';

import { useState } from 'react';
import styles from './styles.module.css';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Login attempt:', { username, password, rememberMe });
  };

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div className={styles.stars}></div>
        <div className={styles.mountains}></div>
        <div className={styles.trees}></div>
      </div>
      
      <div className={styles.loginContainer}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className={styles.options}>
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>
            <a href="#forgot-password">Forgot Password?</a>
          </div>
          
          <button type="submit" className={styles.loginButton}>
            Login
          </button>
        </form>
        
        <p className={styles.register}>
          Don't have an account? <a href="#register">Register</a>
        </p>
      </div>
    </div>
  );
}