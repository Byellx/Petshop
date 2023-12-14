import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

import Database from './database/dbConfig.js'

const db = new Database('./database/dbPetshop.db')
db.createTables()
const PORT = 3008
const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res)=>{
    res.status(200).send('OK')
})

app.post('/signup', (req, res)=>{
    const email = req.body.email
    const password = req.body.password

    console.log(`Email: ${email} | Senha: ${password}`)

    db.findUser(email, (err, user)=>{
        if(err){
            console.error(`Erro ao tentar buscar este usuário: ${err}`)
        }else{
            if(user){
                console.log(`O email: '${email}' já está está cadastrado!`)
                res.status(200).send({
                    "msgServer":"O email já está cadastrado!",
                    "userExists":true
                })
            }else{
                console.log(`O email: '${email}' pode ser cadastrado!`)
                db.addUser(email, password)
                res.status(200).send({
                    "msgServer":"O email pode ser cadastrado!",
                    "userExists":false
                })
                db.allUsers()
            }
        }
    })
})

app.post('/signin', (req, res)=>{
    const email = req.body.email
    const password = req.body.password

    db.findUser(email, (err, user)=> {
        if(err){
            console.error(`Erro ao buscar este usuário: ${err}`)
        }else{
            if(user){
                db.loginUser(email, password, ()=>{
                    console.log('Logado')
                    const token = gerarToken(email)
                    res.status(200).send({
                        "podeLogar":true,
                        "token":token
                    })
                })
            }else{
                console.log('Usuário não existe!')
            }
        }
    })
})

app.listen(PORT, ()=> console.log(`O servidor está rodando na porta ${PORT}`))

const segredo = crypto.randomBytes(32).toString('hex')

function gerarToken(user){
    const payload = {
        username: user.username
    }

    const token = jwt.sign(payload, segredo, {expiresIn: '1h'})

    return token
}