import React, {SetStateAction, useState} from 'react'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/ReactToastify.css'

interface SignUpProps{
    setShowLogin: React.Dispatch<SetStateAction<boolean>>
}

export default function Signup({setShowLogin}:SignUpProps){
    const [email, setEmail] = useState<string>('')
    const [password1, setPassword1] = useState<string>('')
    const [password2, setPassword2] = useState<string>('')
    const [resData, setResData] = useState<any>(null)
    const notifySuccess = () => toast.success('Cadastrado com sucesso!')

    const signUp = async(event:React.FormEvent<HTMLElement>) => 
    {
        event.preventDefault()
        try{
            const resposta = await fetch('http://localhost:3008/signup',{
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password1
                })
            })

            if(resposta.ok){
                console.log('Os dados foram enviados com sucesso!')
                const dadosRes = await resposta.json()
                const dados = dadosRes.msgServer
                const userExists = dadosRes.userExists
                setResData(userExists)
                console.log(`Mensagem do servidor: ${dados} | Usuário existe?: ${userExists}`)
                if(resData){
                    alert('O usuário já está cadastrado!')
                    setEmail('')
                    setPassword1('')
                    setPassword2('')
                }else{
                    notifySuccess()
                    setTimeout(()=>setShowLogin(true), 3000)
                }
            }else{
                throw new Error('Falha ao enviar dados')
            }
            
        }catch(e){
            console.error(`Erro ao se comunicar com o servidor: ${e}`)
        }
    }

    return(
        <>
            <form onSubmit={signUp}>
                <h2>Cadastre-se</h2>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} type='email' placeholder='Email' required/>
                <input value={password1} onChange={(e)=>setPassword1(e.target.value)} type='password' placeholder='Senha' required/>
                <input value={password2} onChange={(e)=>setPassword2(e.target.value)} type='password' placeholder='Confirme a senha' required/>
                <button type='submit'>Cadastrar</button>
                <ToastContainer/>
            </form>
        </>
    )
}