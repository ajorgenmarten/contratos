import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import ContractsService from './contracts.service';
import CreateContractDto from './dto/create-contract.dto';
import FilterContractDto from './dto/filter-contracts.dto';

@Controller('v1/contracts')
export default class ContractsController {
  constructor(private readonly ContractsService: ContractsService) {}

  @Get('contract-types')
  getContractsTypes() {
    return this.ContractsService.getContractsTypes();
  }

  @Post('create')
  createContract(@Body() body: CreateContractDto) {
    return this.ContractsService.createContract(body);
  }

  @Get()
  filterContracts(@Query() query: FilterContractDto) {
    return this.ContractsService.filterContracts(query);
  }
}
