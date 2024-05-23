import Link from "next/link"
import style from '@/styles/sidebar.module.css'
import { useRouter } from "next/router"

export default ({text, pathname, func, currentVal, id, isAdmin}) => {
    const router = useRouter();
    return (
        <li className = {currentVal === pathname ? style.active : ''}>
            <Link 
                onClick = {(event) => {
                    event.preventDefault(); 
                    func(pathname)
                }}
                href = ""
            >
                {text}
                {
                    isAdmin && 
                    <button onClick = {async () => {
                        const response = await fetch("api/deleteCategory", {
                            method: "POST",
                            body: JSON.stringify({id})
                        })
                        if (response.status < 400) {
                            router.reload();
                        }
                    }}>X</button>
                }
            </Link>
        </li>
    )
}