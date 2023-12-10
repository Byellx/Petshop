import sqlite3 from 'sqlite3'

export default class Database{
    constructor(dbFilePath){
        this.db = new sqlite3.Database(dbFilePath, (err)=>{
            if(err){
                console.error(`Erro ao tentar estabelecer conexão com o banco de dados: ${err.message}`)
                throw err
            }else{
                console.log('A conexão com o banco de dados foi estabelecida com sucesso!')
            }
        })
    }

    allUsers(){
        const allUsersQuery = 'SELECT * FROM Users'

        this.db.all(allUsersQuery, [], (err, rows)=>{
            if(err){
                console.log('Erro ao tentar consultar todos os usuários')
            }else{
                console.log('Usuários encontrados: ')
                rows.forEach((row)=>console.log(row))
            }
        })
    }

    addUser(email, password){
        const addUserQuery = 'INSERT INTO Users (Email, Password) VALUES (?,?)'

        this.db.run(addUserQuery, [email, password], (err)=>{
            if(err){
                console.error(`Erro ao tentar inserir usuário no banco de dados: ${err.message}`)
            }else{
                console.log('O usuário foi adicionado ao banco de dados com sucesso!')
            }
        })
    }

    findUser(email, callback){
        const findUserQuery = 'SELECT * FROM Users WHERE Email = ?'

        this.db.get(findUserQuery, [email], (err, row)=>{
            if(err){
                console.error(`Erro ao tentar encontrar usuário com email: ${email}: ${err.message}`)
                callback(err, null)
            }else{
                callback(null, row)
            }
        })
    }

    loginUser(email, password, callback){
        const loginUserQuery = 'SELECT * FROM Users WHERE Email = ? AND Password = ?'

        this.db.get(loginUserQuery, [email, password], (err, row)=>{
            if(err){
                console.error(`Erro ao tentar encontrar usuário '${email}' com a senha '${password}`)
                callback(err, null)
            }else{
                callback(null, row)
            }
        })
    }

    createTables(){
        const createUserTableQuery = `
        CREATE TABLE IF NOT EXISTS Users (
            Id INTEGER PRIMARY KEY AUTOINCREMENT,
            Email TEXT NOT NULL UNIQUE,
            Password TEXT NOT NULL,
            CreationDate TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime', '+3 hours'))
        );        
        `

        this.db.run(createUserTableQuery, (err)=>{
            if(err){
                console.error(`Erro ao tentar criar tabelas`)
            }else{
                console.log('A tabela foi criada com sucesso!')
            }
        })
    }

    showTables(){
        const showTablesQuery = `SELECT name FROM sqlite_master WHERE type='table'`

        this.db.all(showTablesQuery, [], (err, rows)=>{
            if(err){
                console.error(`Erro ao tentar selecionar todas as tabelas: ${err.message}`)
            }else{
                if(rows.length > 0){
                    rows.forEach((row)=>console.log(row))
                }else{
                    console.log('Não há tabelas no banco de dados')
                }
            }
        })
    }

    closeConnection(){
        this.db.close((err)=>{
            if(err){
                console.error(`Erro ao tentar encerrar conexão com o banco de dados: ${err.message}`)
            }else{
                console.log('A conexão com o banco de dados foi encerrada com sucesso!')
            }
        })
    }
}