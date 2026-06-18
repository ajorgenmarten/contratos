import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ContractContainer, ContractType } from '../commons/types/modles.types';
import ContractsRepository from './contracts.repository';
import CreateContractDto from './dto/create-contract.dto';
import { Contract } from '../commons/types/models.classes';
import FilterContractDto from './dto/filter-contracts.dto';

@Injectable()
export default class ContractsService {
  constructor(private readonly ContractsRepository: ContractsRepository) {}

  async getContractsTypes() {
    const types = await this.ContractsRepository.getContractsTypes();
    return {
      contractsDetails: types,
      contractTypes: ContractType,
      contractContainers: ContractContainer,
    };
  }

  async createContract(data: CreateContractDto) {
    const contract = Contract.new(
      data.clientName,
      data.clientDenomination,
      data.clientCategory,
      data.agreementNumber,
      data.agreementDate,
      data.nationalityCompany,
      data.contractTypeId,
      data.contractType,
      data.contractContainer,
      data.contractNumber,
      data.contractDate,
      data.contractValidity,
      data.observations,
    );

    if (data.supplements && data.supplements.length)
      contract.addManySupplements(data.supplements);

    const foundContract = await this.ContractsRepository.findContractByNumber(
      data.contractNumber,
    );

    if (foundContract)
      throw new HttpException(
        'Ya existe un contrato registrado con este número',
        HttpStatus.CONFLICT,
      );

    await this.ContractsRepository.addContract(contract);

    return 'Contrato agregado';
  }

  filterContracts(data: FilterContractDto) {
    return this.ContractsRepository.filterContracts(data);
  }

  deleteContract(id: string) {
    return this.ContractsRepository.deleteContract(id);
  }
}
