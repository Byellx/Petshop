import {useRouter} from 'next/router'
import styles from '@/styles/PetshopInfo.module.css'
import { MouseEventHandler } from 'react'

export default function PetshopInfo(){
    const router = useRouter()

    interface Features{
        id: number,
        fname: string,
        fpage: string
    }

    const features: Features[] = [
        {
            id: 1,
            fname: 'Adestramentos',
            fpage: 'Adestramentos'
        },
        {
            id: 2,
            fname: 'Adoções',
            fpage: 'Adocoes'
        },
        {
            id: 3,
            fname: 'Banhos',
            fpage: 'Banhos'
        },
        {
            id: 4,
            fname: 'Clientes',
            fpage: 'Clientes'
        },
        {
            id: 5,
            fname: 'Consultas',
            fpage: 'Consultas'
        },
        {
            id: 6,
            fname: 'Hospedagens',
            fpage: 'Hospedagens'
        },
        {
            id: 7,
            fname: 'Pets',
            fpage: 'Pets'
        },
        {
            id: 8,
            fname: 'Produtos',
            fpage: 'Produtos'
        },
        {
            id: 9,
            fname: 'Tosas',
            fpage: 'Tosas'
        },
    ]

    return(
        <>
            <main className={styles.main}>
                <section className={styles.featuresBox}>
                    {
                        features.map((feature) =>{
                            return(
                                <Feature
                                    key={feature.id}
                                    feature={`${styles.feature}`}
                                    numberContent={`${styles.numberContent}`}
                                    number={`${styles.number}`}
                                    featureName={`${styles.featureName}`}
                                    symbol={`${styles.symbol}`}
                                    quantity={0}
                                    name={feature.fname}
                                    rota={()=>router.push(`/Features/${feature.fpage}`)}
                                />
                            )
                        })
                    }
                </section>
                <aside className={styles.infoBox}>
                    <div className={styles.info}>
                        <h2>Petshop</h2>
                        <div>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac venenatis metus. Pellentesque non arcu sit amet diam dapibus commodo. Donec pharetra auctor lorem, sit amet finibus est lobortis a. Sed luctus bibendum libero, et posuere nunc scelerisque non. Nulla eu ligula arcu. Nullam ut justo sed libero molestie viverra et quis sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec pretium scelerisque ullamcorper. Aliquam erat volutpat. Phasellus urna lorem, tristique eget venenatis viverra, posuere in mi.
                        </div>
                    </div>
                </aside>
            </main>
        </>
    )
}

interface FeatureProps{
    feature: string,
    numberContent: string,
    number: string,
    featureName: string,
    symbol: string,
    quantity: number,
    name: string,
    rota: MouseEventHandler
}

function Feature(props:FeatureProps){
    const {
        feature,
        numberContent,
        number,
        featureName,
        symbol,
        quantity,
        name,
        rota
    } = props

    return(
        <>
            <article className={feature} onClick={rota}>
                <div className={numberContent}>
                    <span className={number}>{quantity}</span>
                    <h2 className={featureName}>{name}</h2>
                </div>
                <div className={symbol}></div>
            </article>
        </>
    )
}