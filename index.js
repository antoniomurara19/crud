const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const conn = require('./db/conn.js')
const Cadastro = require('./models/Cadastro.js')

const PORT = 3000
const hostname = 'localhost'

/* ----- config express ----- */
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('public'))

/* ----- config handlebars ----- */
app.set('view engine', 'handlebars')
app.engine('handlebars', exphbs.engine())

/* ----------------------------- */

app.post('/cadastrar', async(req,res)=>{
    const nome = req.body.nome
    const email = req.body.email
    const celular = req.body.celular
    await Cadastro.create({nome,email,celular})
    res.redirect('/listar')
})
app.get('/cadastrar',(req,res)=>{
    res.render('cadastrar')
})

app.post('/apagar', async (req,res)=>{
    const id =req.body.id
    console.log(id)
    const pesq = await Cadastro.findOne({raw:true,where:{id:id}})
    console.log(pesq)
    Cadastro.destroy({where: {id:pesq.id}})
    res.redirect('/listar')
})
app.get('/apagar',(req,res)=>{
    res.render('apagar')
})

app.post('/pesquisar', async (req,res)=>{
    const codigo = req.body.codigo
    console.log(codigo)
    const pesq = await Cadastro.findOne({raw:true,where:{id:codigo}})
    console.log(pesq)
    res.render('pesquisar',{valor:pesq})
})
app.get('/pesquisar',(req,res)=>{
    res.render('pesquisar')
})

app.get('/listar', async (req,res)=>{
    const dados = await Cadastro.findAll({raw:true}) 
    res.render('listar',{valores:dados})
})

app.get('/',(req,res)=>{
    res.render('home')
})

/* ----------------------------- */
conn.sync().then(()=>{
    app.listen(PORT,hostname,()=>{
        console.log(`Servidor ${hostname} rodando em ${PORT}`)
    })
}).catch((err)=>{
    console.log(`Não foi possível rodar o servidor devido ao erro ${err}`)
})