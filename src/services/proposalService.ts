import { Proposal } from '../models';

interface PropostaInput {
    nomeProdutor: string;
    cpf: string;
    nomeFazenda: string;
    cidade: string;
    estado: string;
    areaAgricultavel: number;
    areaVegetacao: number;
    tipoCultivo: string[];
    valorProposta: number;
}

export class ProposalService {
    static async listProposals() {
        return await Proposal.findAll();
    };

    static async createProposal(data: PropostaInput) {
        const areaTotal = data.areaAgricultavel + data.areaVegetacao;
        return await Proposal.create({ ...data, areaTotal });
    };

    static async updateProposal(id: number, data: PropostaInput) {
        const proposal = await Proposal.findByPk(id);
        if (!proposal) return null;

        const areaTotal = data.areaAgricultavel + data.areaVegetacao;
        await proposal.update({ ...data, areaTotal });

        return proposal;
    };

    static async deleteProposal(id: number) {
        const proposal = await Proposal.findByPk(id);
        if (!proposal) return null;

        await proposal.destroy();
        return true;
    }
}

export default ProposalService;
