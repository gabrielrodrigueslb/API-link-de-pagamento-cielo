export function parseNumber(value) {
  if (typeof value === 'number') return value;

  if (typeof value !== 'string') {
    throw new Error('Valor inválido');
  }

  // Remove tudo que não é número, vírgula ou ponto
  let cleaned = value.replace(/[^\d.,-]/g, '');

  // Se tiver vírgula e ponto, assume formato BR (1.234,56)
  if (cleaned.includes(',') && cleaned.includes('.')) {
    cleaned = cleaned.replace(/\./g, '').replace(',', '.');
  } else {
    // Se só tiver vírgula, troca por ponto
    cleaned = cleaned.replace(',', '.');
  }

  const number = Number(cleaned);

  if (Number.isNaN(number)) {
    throw new Error(`Não foi possível converter o valor: ${value}`);
  }

  return number;
}

export function dataMais30Dias() {
  const date = new Date();
  date.setDate(date.getDate() + 30);

  const pad = (n) => String(n).padStart(2, '0');

  const YYYY = date.getFullYear();
  const MM = pad(date.getMonth() + 1);
  const DD = pad(date.getDate());
  const HH = pad(date.getHours());
  const mm = pad(date.getMinutes());
  const ss = pad(date.getSeconds());

  return `${YYYY}-${MM}-${DD} ${HH}:${mm}:${ss}`;
}

