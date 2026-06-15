import { Injectable } from '@nestjs/common';
import PrismaService from '../commons/services/prisma.service';
import { Contract } from '../commons/types/models.classes';
import {
  ClientCategory,
  ClientDenomination,
  ContractContainer,
  ContractType,
} from '../commons/types/modles.types';
import { ContractWhereInput } from 'generated/prisma/models';

type FilterContractsOptions = {
  page?: number;
  search?: string;
  contractNumber?: string;
};

@Injectable()
export default class ContractsRepository {
  constructor(private readonly PrismaService: PrismaService) {}

  async getContractsTypes() {
    const types = await this.PrismaService.contractDetails.findMany();
    return types;
  }

  async findContractByNumber(number: string) {
    const contract = await this.PrismaService.contract.findFirst({
      where: {
        contractNumber: number,
      },
    });

    if (!contract) return null;

    return new Contract(
      contract.id,
      contract.clientName,
      contract.clientDenomination as ClientDenomination,
      contract.clientCategory as ClientCategory,
      contract.agreementNumber,
      contract.agreementDate,
      contract.nationalityCompany,

      contract.contractTypeId,
      contract.contractType as ContractType,
      contract.contractContainer as ContractContainer,
      contract.contractNumber,
      contract.contractDate,
      contract.contractValidity,

      contract.observations,
    );
  }

  async addContract(contract: Contract) {
    await this.PrismaService.contract.create({
      data: {
        id: contract.id,
        agreementDate: contract.agreementDate,
        agreementNumber: contract.agreementNumber,
        clientCategory: contract.clientCategory,
        clientDenomination: contract.clientDenomination,
        clientName: contract.clientName,
        contractDate: contract.contractDate,
        contractNumber: contract.contractNumber,
        contractValidity: contract.contractValidity,
        nationalityCompany: contract.nationalityCompany,
        contractContainer: contract.contractContainer,
        contractType: contract.contractType,
        contractTypeId: contract.contractTypeId,
        observations: contract.observations,
      },
    });

    await this.PrismaService.supplement.createMany({
      data:
        contract.Supplements?.map((supplement) => ({
          id: supplement.id,
          contractId: supplement.contractId,
          supplementNumber: supplement.supplementNumber,
          supplementDate: supplement.supplementDate,
          supplementObject: supplement.supplementObject,
          supplementValidity: supplement.supplementValidity,
        })) ?? [],
    });
  }

  async filterContracts(options: FilterContractsOptions) {
    const page = options.page || 1;
    const pageSize = 20;
    const search = options.search || '';

    const where: ContractWhereInput = {
      OR: [
        { clientName: { contains: search, mode: 'insensitive' } },
        {
          nationalityCompany: {
            contains: options.search,
            mode: 'insensitive',
          },
        },
        {
          agreementNumber: { contains: search, mode: 'insensitive' },
        },
      ],
    };

    if (options.contractNumber) {
      where.contractNumber = options.contractNumber;
    }

    const totalItems = await this.PrismaService.contract.count({
      where: where,
    });
    const totalPages = Math.ceil(totalItems / pageSize);
    const results = await this.PrismaService.contract.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: { Supplements: true, ContractDetails: true },
      orderBy: { contractDate: 'desc' },
    });
    return { totalPages, totalItems, results, page };
  }
}
