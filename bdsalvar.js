// db.js
const { Sequelize, DataTypes } = require('sequelize');

// Configura a conexão com o banco de dados PostgreSQL
const sequelize = new Sequelize('BDDAPLICATIVO', 'postgres', 'admin', {
  host: 'localhost',
  dialect: 'postgres',
});

// Define o modelo da tabela 'servidores'
const AgendarConsulta = sequelize.define('AgendarConsulta', {
    idAgendarConsulta: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sexo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dataConsulta: {
      type: DataTypes.DATE,
      allowNull: false
    },
    horaConsulta: {
      type: DataTypes.TIME,
      allowNull: false
    },
    psicologoAtendente: {
      type: DataTypes.STRING,
      allowNull: false
    },
    formaDePagamento: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  const Usuario = sequelize.define('Usuario', {
    idusuario: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    endereco: {
      type: DataTypes.STRING,
      allowNull: false
    },
    datanascimento: {
      type: DataTypes.DATE,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    crp: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });
  

  const CadastroPaciente = sequelize.define('CadastroPaciente', {
    idcadastropaciente: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sexo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    endereco: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });
  




// Sincroniza o modelo com o banco de dados
sequelize.sync()
  .then(() => {
    console.log('Tabela sincronizada com o banco de dados.');
  })
  .catch(error => {
    console.error('Erro ao sincronizar a tabela:', error);
  });

module.exports = { AgendarConsulta, CadastroPaciente, Usuario, sequelize };