import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import { ProposalAttributes } from '../types/proposal';

type ProposalCreationAttributes = Optional<ProposalAttributes, 'id' | 'areaTotal'>;

export class Proposal extends Model<ProposalAttributes, ProposalCreationAttributes> implements ProposalAttributes {
  public id!: number;
  public nomeProdutor!: string;
  public cpf!: string;
  public nomeFazenda!: string;
  public cidade!: string;
  public estado!: string;
  public areaAgricultavel!: number;
  public areaVegetacao!: number;
  public areaTotal!: number;
  public tipoCultivo!: string[]; 
  public valorProposta!: number;
}

Proposal.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nomeProdutor: DataTypes.STRING,
  cpf: DataTypes.STRING,
  nomeFazenda: DataTypes.STRING,
  cidade: DataTypes.STRING,
  estado: DataTypes.STRING,
  areaAgricultavel: DataTypes.FLOAT,
  areaVegetacao: DataTypes.FLOAT,
  areaTotal: DataTypes.FLOAT,
  tipoCultivo: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  valorProposta: DataTypes.FLOAT,
}, {
  sequelize,
  tableName: 'proposals',
});
