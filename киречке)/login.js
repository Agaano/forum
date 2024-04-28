import style from '@/styles/login.module.css';
import InputBox from '@/components/input/inputbox';
import inputStyles from '@/components/input/input.module.css';
import {ButtonBox} from '@/components/input/inputbox';
import {useState} from 'react';
import Router from 'next/router';
import Cookies from 'js-cookie';

export default function() {
    const [login, setLogin] = useState(null);
    const [password, setPassword] = useState(null);    
    
    async function handleLogin(event) {
        event.preventDefault();
        const response = await fetch('./api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({login, password})
        });
        if (response.ok) {
            Cookies.set('auth', 'true', {expires: 7});
            Cookies.set('_ln', login, {expires: 7});
            Cookies.set('_pd', password, {expires: 7});
        
            Router.push('/');
        } else {
            alert('Неправильное имя пользователя или пароль!');
        }
    }

    return (
        <>
            <div className = {style.login__wrapper}>
                <div className = {style.form__wrapper}>
                    <h1><colortext>Вход</colortext></h1>
                    <form className={inputStyles.form} onSubmit={handleLogin}>
                        <InputBox text = 'Логин' event = {setLogin} id = 'login' />
                        <InputBox text = 'Пароль' event = {setPassword} id = 'password' isPassword/>
                        <p className={inputStyles.form__text}>Ещё нет аккаунта? <a href = '/signup'>Зарегистрироваться</a></p>
                        <ButtonBox text = 'Войти'/>
                    </form>
                </div>
            </div>
        </>
    )
}