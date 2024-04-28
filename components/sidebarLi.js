import Link from "next/link"
import style from '@/styles/sidebar.module.css'

export default ({text, pathname, func, currentVal}) => {
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
            </Link>
        </li>
    )
}