import { useRouter } from "next/router"
import style from '@/styles/profile.module.css'
import {useEffect} from 'react'
export default ({data}) => {
    const router = useRouter();

    useEffect(() => {
        const checkLogin = () => {
            if (!data.isLogged) router.push('/login');
        } 
        checkLogin()
    }, [])

    const handleClick = (e) => {
        e.preventDefault();
        const response = fetch('api/logout')
        response.then((status) => {
            console.log(status.status);
            router.push('/login');
        })
    }

    return (
        <div className = {style.body__wrapper}>
            <h1>{data.name}</h1><br/>
            <h2>{data.email}</h2><br/>
            <a href = '#?' onClick = {handleClick} className = {style.logout_button}>Выйти из аккаунта</a>
        </div>
    )
}