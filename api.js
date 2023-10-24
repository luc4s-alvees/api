const express = require('express');
const nodemailer = require('nodemailer');
const serverless = require('serverless-http');

const app = express();
const router = express.Router();

app.use(express.json());

// Configuração do Nodemailer com suas credenciais de e-mail
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'apiportifolio@gmail.com',
    pass: 'Portifolio@@1234' // Certifique-se de usar variáveis de ambiente para ocultar sua senha
  }
});

// Defina uma rota para enviar e-mails
router.post('/enviar-email', async (req, res) => {
  const { destinatario, assunto, mensagem } = req.body;

  const mailOptions = {
    from: 'apiportifolio@gmail.com',
    to: destinatario,
    subject: assunto,
    text: mensagem
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'E-mail enviado com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao enviar o e-mail.' });
  }
});

app.use('/.netlify/functions/api', router);

module.exports = app;
module.exports.handler = serverless(app);
