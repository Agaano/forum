import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '@/styles/regForm.module.css';

const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleSubmitReg = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }

    const response = await fetch('/api/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
        alert('Регистрация прошла успешно!')
        router.push('/login')
    } else {
        const data = await response.json();
        alert(data.message);
    }
  };

  return (
    <form className={styles.registrationForm} onSubmit={handleSubmitReg}>
      <h3>Регистрация</h3>
      <div className={styles.formGroup}>
        <label htmlFor="name">Имя</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="password">Пароль</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="confirmPassword">Подтвердите пароль</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <p>
        Уже есть аккаунт? <Link href="/login">Войти</Link>
      </p>
      <button type="submit">Зарегистрироваться</button>
    </form>
  );
};

export default RegistrationForm;
