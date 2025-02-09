// db.js
const { Sequelize, DataTypes } = require('sequelize');

// Configura a conexão com o banco de dados PostgreSQL
const sequelize = new Sequelize('teste', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
});

const Usuario = sequelize.define('Usuarios', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    senha: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
}, {
    tableName: 'usuarios', // Nome da tabela no banco de dados
    timestamps: false, // Desabilita timestamps automáticos (createdAt, updatedAt)
});

// Sincroniza o modelo com o banco de dados
sequelize.sync()
  .then(() => {
    console.log('Tabela sincronizada com o banco de dados.');
  })
  .catch(error => {
    console.error('Erro ao sincronizar a tabela:', error);
  });

module.exports = { Usuario, sequelize };
