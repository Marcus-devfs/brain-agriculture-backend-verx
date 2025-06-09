import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import { Sequelize } from 'sequelize';
import { Proposal } from '../src/models/proposal';
import proposalRoutes from '../src/routes/proposalRoutes';

let app: express.Express;
let sequelize: Sequelize;

beforeAll(async () => {
    const testDbUrl = process.env.TEST_DATABASE_URL;
    if (!testDbUrl) {
      throw new Error('TEST_DATABASE_URL não configurada');
    }
  
    sequelize = new Sequelize(testDbUrl, {
      logging: false,
    });
  

  // Reinit model com nova conexão
  Proposal.init(Proposal.getAttributes(), {
    sequelize,
    tableName: 'proposals',
  });

  // Sincroniza o banco - cria tabelas do zero
  await sequelize.sync({ force: true });

  app = express();
  app.use(bodyParser.json());
  app.use('/', proposalRoutes);
});

afterAll(async () => {
  await sequelize.close();
});

describe('Proposals API - Integration', () => {
  it('deve criar uma nova proposta', async () => {
    const data = {
      nomeProdutor: 'João',
      cpf: '12345678900',
      nomeFazenda: 'Fazenda Boa Vista',
      cidade: 'Uberlândia',
      estado: 'MG',
      areaAgricultavel: 100,
      areaVegetacao: 50,
      tipoCultivo: ['Milho'], // array válido para PostgreSQL
      valorProposta: 150000,
    };

    const response = await request(app).post('/proposal/create').send(data);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.areaTotal).toBe(150);
  });

  it('deve listar as propostas', async () => {
    const response = await request(app).get('/proposals');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
