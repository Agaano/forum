import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '@/styles/authForm.module.css';
import cookies from 'js-cookie';
import {TailSpin} from 'react-loader-spinner';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [message, setMessage] = useState();
  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: {'Content-Type': 'application/json',},
      body: JSON.stringify({ name, email, password }),
    });
    const data = await response.json();
    if (response.status >= 400) {
      setMessage(data.message)
      setLoading(false);
      return;
    }
    cookies.set('_is', data.message);
    router.push('/');

  };

  return (
    <div className={styles.authForm}>
      <h2>Авторизация</h2>
      {message}
      <form onSubmit={handleSubmitLogin}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Пароль:</label>
        <input
          type="password"
          id="password"
          name="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>
          Ещё нет аккаунта? <Link href="/register">Зарегистрироваться</Link>
        </p>
        {loading ? 
        <button className = {styles.disabledButton}><TailSpin color = '#00f' width = {30} height = {30}/></button>
        :
        <button type="submit">Войти</button>}
      </form>
    </div>
  );
};

export default LoginForm;
