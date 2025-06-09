import express from 'express';
import cors from 'cors';
import propostaRoutes from './routes/proposalRoutes';

const app = express();

app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use('/', propostaRoutes);


export default app;
