const express = require('express');
const cors = require('cors');
const { AgendarConsulta, CadastroPaciente, Usuario, sequelize } = require('./bd'); // Ajuste o caminho conforme necessário

const app = express();
const port = 3000; // Ajuste a porta conforme necessário

app.use(cors()); // Habilita CORS
app.use(express.json()); // Faz o parsing do JSON no corpo das requisições

// Rota para obter todos os usuários
app.get('/usuarios', async (req, res) => {
    try {
      const usuarios = await Usuario.findAll(); 
      res.status(200).json({ success: true, data: usuarios });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Erro ao buscar usuários.' });
    }
  });

// Rota para obter um usuário por ID
app.get('/usuario/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id); // Busca um usuário pelo ID
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).send('Usuário não encontrado');
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário.' });
  }
});

// Rota para criar um novo usuário
app.post('/usuario/inserir', async (req, res) => {
  try {
    const novoUsuario = await Usuario.create(req.body); // Cria um novo usuário
    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao inserir usuário.' });
  }
});

// Rota para atualizar um usuário
app.put('/usuario/atualizar/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id); // Busca um usuário pelo ID
    if (usuario) {
      await usuario.update(req.body); // Atualiza o usuário com os novos dados
      res.json(usuario);
    } else {
      res.status(404).send('Usuário não encontrado');
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar usuário.' });
  }
});

// Rota para deletar um usuário
app.delete('/usuario/deletar/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id); // Busca um usuário pelo ID
    if (usuario) {
      await usuario.destroy(); // Deleta o usuário
      res.json({ message: 'Usuário deletado com sucesso.' });
    } else {
      res.status(404).send('Usuário não encontrado');
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar usuário.' });
  }
});

// Rota para obter todas as consultas agendadas
app.get('/consultas', async (req, res) => {
  try {
    const consultas = await AgendarConsulta.findAll(); // Busca todas as consultas
    res.json(consultas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar consultas.' });
  }
});

// Rota para criar uma nova consulta
app.post('/consulta/inserir', async (req, res) => {
  try {
    const novaConsulta = await AgendarConsulta.create(req.body); // Cria uma nova consulta
    res.status(201).json(novaConsulta);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao inserir consulta.' });
  }
});

// Rota para obter todos os pacientes
app.get('/pacientes', async (req, res) => {
  try {
    const pacientes = await CadastroPaciente.findAll(); // Busca todos os pacientes
    res.json(pacientes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar pacientes.' });
  }
});

// Rota para criar um novo paciente
app.post('/paciente/inserir', async (req, res) => {
  try {
    const novoPaciente = await CadastroPaciente.create(req.body); // Cria um novo paciente
    res.status(201).json(novoPaciente);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao inserir paciente.' });
  }
});

// Sincroniza o servidor com o banco de dados e inicia a aplicação
app.listen(port, async () => {
  try {
    await sequelize.sync(); // Sincroniza os modelos com o banco de dados
    console.log(`Servidor rodando em http://localhost:${port}`);
  } catch (error) {
    console.error('Erro ao sincronizar o banco de dados:', error);
  }
});
