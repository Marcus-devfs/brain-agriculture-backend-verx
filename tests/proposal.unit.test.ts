import { Proposal } from '../src/models';
import ProposalService from '../src/services/proposalService';

jest.mock('../src/models', () => ({
  Proposal: {
    findAll: jest.fn(),
    create: jest.fn(),
    findByPk: jest.fn()
  }
}));

describe('ProposalService - Unit', () => {
  const mockProposal = {
    update: jest.fn(),
    destroy: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should list all proposals', async () => {
    (Proposal.findAll as jest.Mock).mockResolvedValue(['mock']);
    const result = await ProposalService.listProposals();
    expect(result).toEqual(['mock']);
    expect(Proposal.findAll).toHaveBeenCalled();
  });

  it('should create a proposal with areaTotal', async () => {
    const input = {
      nomeProdutor: 'João',
      cpf: '123',
      nomeFazenda: 'Fazenda Boa',
      cidade: 'Cidade',
      estado: 'UF',
      areaAgricultavel: 100,
      areaVegetacao: 50,
      tipoCultivo: ['soja', 'trigo'],
      valorProposta: 500000
    };
    (Proposal.create as jest.Mock).mockResolvedValue({ id: 1, ...input, areaTotal: 150 });
    const result = await ProposalService.createProposal(input);
    expect(result.areaTotal).toBe(150);
    expect(Proposal.create).toHaveBeenCalledWith({ ...input, areaTotal: 150 });
  });

  it('should update a proposal if found', async () => {
    (Proposal.findByPk as jest.Mock).mockResolvedValue(mockProposal);
    const data = {
      nomeProdutor: 'Maria',
      cpf: '456',
      nomeFazenda: 'Fazenda Nova',
      cidade: 'Outra Cidade',
      estado: 'UF',
      areaAgricultavel: 200,
      areaVegetacao: 30,
      tipoCultivo: ['milho', 'soja'],
      valorProposta: 300000
    };
    await ProposalService.updateProposal(1, data);
    expect(mockProposal.update).toHaveBeenCalledWith({ ...data, areaTotal: 230 });
  });

  it('should return null when updating a non-existent proposal', async () => {
    (Proposal.findByPk as jest.Mock).mockResolvedValue(null);
    const result = await ProposalService.updateProposal(999, {} as any);
    expect(result).toBeNull();
  });

  it('should delete a proposal if found', async () => {
    (Proposal.findByPk as jest.Mock).mockResolvedValue(mockProposal);
    const result = await ProposalService.deleteProposal(1);
    expect(mockProposal.destroy).toHaveBeenCalled();
    expect(result).toBe(true);
  });

  it('should return null when deleting a non-existent proposal', async () => {
    (Proposal.findByPk as jest.Mock).mockResolvedValue(null);
    const result = await ProposalService.deleteProposal(999);
    expect(result).toBeNull();
  });
});
