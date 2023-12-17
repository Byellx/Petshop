import {useState} from 'react'
import {useRouter} from 'next/router'
import styles from '@/styles/Navbar.module.css'

export default function Navbar(){
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter()

    const openNavbar = () => {
        setIsOpen(!isOpen)
    }

    const logout = () => {
        if(localStorage.getItem('token')){
            localStorage.removeItem('token')
            router.push('/Petshop')
        }
    }

    return(
        <>
            <nav className={isOpen?styles.nav:styles.open}>
                <section className={styles.logo}>
                    <div className={styles.menuBox}>
                        <div className={styles.menuIcon} onClick={openNavbar}></div>
                        <span onClick={()=>router.push('/MyPetshop')}>Petshop</span>
                    </div>
                </section>

                <aside className={styles.sidebar}>
                    <section className={styles.logo}>
                        <div className={styles.menuBox}>
                            <div className={styles.menuIcon} onClick={openNavbar}></div>
                            <span onClick={()=>router.push('/MyPetshop')}>Petshop</span>
                        </div>
                    </section>

                    <section className={styles.itemsBox}>
                        <ul className={styles.itemsList}>
                            <li className={styles.item}>
                                <a className={styles.link}>
                                    <div className={styles.icon1}></div>
                                    <span className={styles.page}>Adoção</span>
                                </a>
                            </li>

                            <li className={styles.item}>
                                <a className={styles.link}>
                                    <div className={styles.icon2}></div>
                                    <span className={styles.page}>Banho e Tosa</span>
                                </a>
                            </li>

                            <li className={styles.item}>
                                <a className={styles.link}>
                                    <div className={styles.icon3}></div>
                                    <span className={styles.page}>Pet Hotel</span>
                                </a>
                            </li>

                            <li className={styles.item}>
                                <a className={styles.link}>
                                    <div className={styles.icon4}></div>
                                    <span className={styles.page}>Produtos</span>
                                </a>
                            </li>

                            <li className={styles.item}>
                                <a className={styles.link}>
                                    <div className={styles.icon5}></div>
                                    <span className={styles.page}>Veterinária</span>
                                </a>
                            </li>
                        </ul>
                        <ul className={styles.itemsBottom}>
                            <li className={styles.item}>
                                <a className={styles.link}>
                                    <div className={styles.icon6}></div>
                                    <span className={styles.page}>Configurações</span>
                                </a>
                            </li>

                            <li className={styles.item}>
                                <a className={styles.link}>
                                    <div className={styles.icon7}></div>
                                    <span className={styles.page} onClick={logout}>Sair</span>
                                </a>
                            </li>
                        </ul>
                    </section>
                </aside>
            </nav>
            {
                isOpen && <div className={styles.back} onClick={openNavbar}></div>
            }
        </>
    )
}