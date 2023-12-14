import {useState} from 'react'
import {useRouter} from 'next/router'

export default function Login(){
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [token, setToken] = useState<string>('')
    const router = useRouter()

    const signIn = async(event:React.FormEvent<HTMLElement>) => {
        event.preventDefault()
        try{
            const resposta = await fetch('http://localhost:3008/signin', {
                method:'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })

            if(resposta.ok){
                const dados = await resposta.json()
                setToken(dados.token)
                if(dados.podeLogar == true){
                    //redirecionar para painel principal
                    localStorage.setItem('token', dados.token)
                    if(localStorage.getItem('token')){
                        console.log('Ok, redirecionando...')
                        router.push('/MyPetshop')
                    }
                }
            }
        }catch(e){
            console.error(`Erro: ${e}`)
        }
    }

    return(
        <>
            <form onSubmit={signIn}>
                <h2>Login</h2>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} type='email' placeholder='Email' required/>
                <input value={password} onChange={(e)=>setPassword(e.target.value)} type='password' placeholder='Senha' required/>
                <button type='submit'>Entrar</button>
            </form>
        </>
    )
}