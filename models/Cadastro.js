const DataTypes = require('sequelize')
const db = require('../db/conn.js')

const Cadastro = db.define('usuario',{
    nome: {
        type: DataTypes.STRING('64')
    },
    email: {
        type: DataTypes.STRING('255')
    },
    celular: {
        type: DataTypes.STRING('15')
    }
},{
    createdAt: false,
    updatedAt: false
})

// Cadastro.sync({force:true})

module.exports = Cadastro