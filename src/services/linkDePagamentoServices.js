import { http } from '../lib/axios.js';
import { dataMais30Dias, parseNumber } from '../lib/utils.js';

async function criarToken(basic) {
  if (!basic) throw new Error('Basic não enviado');

  try {
    const response = await http.post(
      'https://cieloecommerce.cielo.com.br/api/public/v2/token',
      '',
      {
        headers: {
          Authorization: `Basic ${basic}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    return response.data.access_token;
  } catch (error) {
    throw error;
  }
}

export async function criarLink(
  valor,
  descricao,
  parcelas,
  chatId,
  authorization,
) {
  if (!valor) throw new Error('Valor não enviado');
  if (!chatId) throw new Error('ChatId não enviado');
  if (parcelas > 12) throw new Error('Máximo de parcelas é 12');

  const orderNumber = `${chatId}-${Date.now()}`;
  const valorCentavos = Math.round(parseNumber(`${valor}`) * 100);
  const expiresAt = dataMais30Dias();

  const token = await criarToken(authorization);

  const bodyLink = {
    OrderNumber: orderNumber,
    type: 'Payment',
    name: 'Pedido',
    description: `${descricao}`,
    showDescription: true,
    price: `${valorCentavos}`,
    expirationDate: expiresAt,
    maxNumberOfInstallments: `${parcelas}` || '1',
    quantity: 1,
    shipping: {
      type: 'WithoutShipping',
    },
  };

  const responseLink = await http.post(
    'https://cieloecommerce.cielo.com.br/api/public/v1/products/',
    bodyLink,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return responseLink.data;
}
