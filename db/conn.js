const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('crud','root','senai',{
    dialect: 'mysql',
    host: 'localhost'
})

// sequelize.authenticate().then(()=>{
//     console.log(`Banco de dados conectado com sucesso!!`)
// }).catch((err)=>{
//     console.log(`Não foi possível conectar ao devido ao erro ${err}`)
// })

module.exports = sequelize