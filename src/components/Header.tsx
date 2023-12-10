import Link from 'next/link'
import '@/styles/Header.module.css'

export default function Header(){
    return(
        <>
            <nav className='header' >
                <span><Link href='/'>Home</Link></span>
                <span><Link href='/Petshop'>Petshop</Link></span>
                <span><Link href='#'>Sobre</Link></span>
            </nav>
        </>
    )
}