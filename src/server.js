import express from 'express';
import 'dotenv/config';
import linkRoutes from './routes/LinkDePagamentoRoutes.js'
import cors from 'cors'

const app = express();
const PORT = process.env.PORT || 4000

app.use(express.json());
app.use(cors());

app.use('/cielo', linkRoutes);

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
