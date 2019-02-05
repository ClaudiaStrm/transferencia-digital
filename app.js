const express = require('express')
const db = require('./database/db')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('olar')
})

app.get('/api/usuario', (req, res) => {
    res.send(
        db
    )
})

app.post('/api/usuario', (req, res) => {
    const user = {
        id: db.length + 1, 
        nome: req.body.nome, 
        username: req.body.username, 
        cpf: req.body.cpf
    }
    
    if (!user.nome || !user.username || !user.cpf) {
        return res.send({
            success: 'false',
            message: 'campo não preenchido'
        })
    }

    db.push(user)
    return res.send({
        success: true,
        message: 'usuario criado',
        user
    })
})

app.get('/api/usuario/:id', (req, res) => {        
    const id = parseInt(req.params.id, 10)

    const user = db.find(u => {
        return id === u.id        
    })

    if (user) {
        return res.send(
            user
        )
    }

    return res.send({
        success: 'false',
        message: 'usuario não encontrado'
    })
})

app.put('/api/usuario/:id', (req, res) => {
    const id = parseInt(req.params.id, 10)
    let index, user = null;
    db.forEach((u, i) => {
        if  (id === u.id) {
            user = u
            index = i
            return
        }
    })

    const usuarioModificado = {
        id: user.id,
        nome: req.body.nome ||  user.nome, 
        username: req.body.username || user.username, 
        cpf: req.body.cpf || user.cpf
    }    

    
    if (user) return res.send(
        usuarioModificado
    )
})

app.delete('/api/usuario/:id', (req, res) => {
    db.forEach((u, i) => {
        if  (parseInt(req.params.id, 10) === u.id) {
            db.splice(i, 1)
            return res.send({
                message: 'usuário excluído'
            })
        }
    })
})


const PORT = 5000

app.listen(PORT, () => {
    console.log(`servidor rodando na porta ${PORT}`)
})