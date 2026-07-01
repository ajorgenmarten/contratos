import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import ContractsService from './contracts.service';
import CreateContractDto from './dto/create-contract.dto';
import FilterContractDto from './dto/filter-contracts.dto';
import SessionGuard from '../commons/guards/session.guard';
import AuthGuard from '../commons/guards/auth.guard';
import RolesGuard from '../commons/guards/roles.guard';
import Roles from '../commons/decorator/role.decorator';
import { RoleType } from '../commons/types/modles.types';

@Roles([RoleType.CONSULTOR])
@UseGuards(SessionGuard, AuthGuard, RolesGuard)
@Controller('v1/contracts')
export default class ContractsController {
  constructor(private readonly ContractsService: ContractsService) {}

  @Roles([RoleType.OPERADOR])
  @Get('contract-types')
  getContractsTypes() {
    return this.ContractsService.getContractsTypes();
  }

  @Roles([RoleType.OPERADOR])
  @Post('create')
  createContract(@Body() body: CreateContractDto) {
    return this.ContractsService.createContract(body);
  }

  @Roles([RoleType.OPERADOR, RoleType.CONSULTOR])
  @Get()
  filterContracts(@Query() query: FilterContractDto) {
    return this.ContractsService.filterContracts(query);
  }

  @Roles([RoleType.OPERADOR])
  @Delete(':id')
  deleteContract(@Param('id') id: string) {
    return this.ContractsService.deleteContract(id);
  }
}
