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

    static async getProposal(id: number) {
        return await Proposal.findByPk(id);
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

    static async getDashboardData() {
        const propostas = await Proposal.findAll();

        const totalPropostas = propostas.length;
        const totalFazendas = new Set(propostas.map(p => p.nomeFazenda)).size;
        const totalHectares = propostas.reduce((acc, p) => acc + p.areaAgricultavel + p.areaVegetacao, 0);

        const porEstado = propostas.reduce((acc: Record<string, number>, p) => {
            acc[p.estado] = (acc[p.estado] || 0) + 1;
            return acc;
        }, {});

        console.log('propostas: ', propostas)
        const porCultivo = propostas.reduce((acc: Record<string, number>, p) => {
            const raw = p.tipoCultivo as string | string[];

            let tipoCultivoArray: string[] = [];

            if (typeof raw === 'string') {
                tipoCultivoArray = raw
                  .replace(/^{|}$/g, '')
                  .split(',')
                  .map((c) => c.trim().replace(/^"|"$/g, ''));
              } else if (Array.isArray(raw)) {
                tipoCultivoArray = raw;
              }

            tipoCultivoArray.forEach(cultivo => {
                acc[cultivo] = (acc[cultivo] || 0) + 1;
            });

            return acc;
        }, {});

        const usoSolo = {
            agriculturavel: propostas.reduce((acc, p) => acc + p.areaAgricultavel, 0),
            vegetacao: propostas.reduce((acc, p) => acc + p.areaVegetacao, 0),
        };

        return {
            totalPropostas,
            totalFazendas,
            totalHectares,
            porEstado,
            porCultivo,
            usoSolo,
        };
    }

}

export default ProposalService;
