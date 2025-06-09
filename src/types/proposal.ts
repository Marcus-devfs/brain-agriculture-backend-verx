export interface ProposalAttributes {
    id: number;
    nomeProdutor: string;
    cpf: string;
    nomeFazenda: string;
    cidade: string;
    estado: string;
    areaAgricultavel: number;
    areaVegetacao: number;
    areaTotal: number;
    tipoCultivo: string[]; 
    valorProposta: number;
  }