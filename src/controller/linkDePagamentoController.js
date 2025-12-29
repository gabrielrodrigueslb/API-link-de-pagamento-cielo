import { criarLink } from '../services/linkDePagamentoServices.js';

export async function CriarLinkController(req, res) {
  try {
    const authHeader = req.headers.authorization;
    const { valor, descricao, parcelas, chatId } = req.body;

    if (!authHeader) {
      return res.status(401).json({ error: 'Authorization não enviado' });
    }

    if (!authHeader.startsWith('Basic ')) {
      return res.status(401).json({ error: 'Authorization deve ser Basic' });
    }

    const basicToken = authHeader.split(' ')[1];

    if (!valor) {
      return res.status(400).json({ error: 'Valor não foi enviado' });
    }
    if (!chatId) {
      return res.status(400).json({ error: 'ChatId não foi enviado' });
    }

    const link = await criarLink(
      valor,
      descricao,
      parcelas,
      chatId,
      basicToken, // passa o header inteiro
    );

    res.json(link);
  } catch (err) {
    console.error('Erro Cielo:', err.response?.data || err.message);

    // Retornar o erro detalhado da API externa se existir
    const status = err.response?.status || 500;
    const message = err.response?.data || { error: err.message };
    
    res.status(status).json(message);
  }
}
