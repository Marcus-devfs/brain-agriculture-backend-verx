import express from 'express';
import cors from 'cors';
import propostaRoutes from './routes/proposalRoutes';

const app = express();

app.use(cors({
    origin: 'https://seu-front.vercel.app', // substitua pelo domínio correto do frontend na Vercel
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
app.options('*', cors());
app.use(express.json());
app.use('/', propostaRoutes);


export default app;
