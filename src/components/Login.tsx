import {useState} from 'react'

export default function Login(){
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

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
                if(dados.podeLogar == true){
                    //redirecionar para painel principal
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