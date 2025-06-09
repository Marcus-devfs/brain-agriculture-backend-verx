import { Request, Response } from 'express';
import ProposalService from '../services/proposalService';

class CreditProposalController {
    static async getAll(req: Request, res: Response) {
        const propostas = await ProposalService.listProposals();
        res.json(propostas);
    };

    static async create(req: Request, res: Response) {
        try {
            const proposta = await ProposalService.createProposal(req.body);
            res.status(201).json(proposta);
        } catch (error) {
            res.status(400).json({ message: 'Erro ao criar proposta', error });
        }
    };

    static async update(req: any, res: any) {
        const id = Number(req.params.id);
        const proposta = await ProposalService.updateProposal(id, req.body);
        if (!proposta) return res.status(404).json({ message: 'Proposta não encontrada' });

        res.json(proposta);
    };

    static async remove(req: any, res: any) {
        const id = Number(req.params.id);
        const ok = await ProposalService.deleteProposal(id);
        if (!ok) return res.status(404).json({ message: 'Proposta não encontrada' });

        res.status(204).send();
    };

}

export { CreditProposalController };
