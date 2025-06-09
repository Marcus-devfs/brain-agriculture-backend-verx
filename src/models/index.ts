import { sequelize } from '../config/database';
import { Proposal } from './proposal';

export const initDb = async () => {
  await sequelize.sync();
};

export { Proposal };
