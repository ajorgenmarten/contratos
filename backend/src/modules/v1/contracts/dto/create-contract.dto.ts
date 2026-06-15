import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
  ValidateNested,
} from 'class-validator';
import {
  ClientCategory,
  ClientDenomination,
  ContractContainer,
  ContractType,
} from '../../commons/types/modles.types';

class SupplementDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  supplementNumber: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  supplementObject: string;

  @ApiProperty()
  @IsDate()
  supplementValidity: Date;

  @ApiProperty()
  @IsDate()
  supplementDate: Date;
}

export default class CreateContractDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  clientName: string;

  @ApiProperty()
  @IsEnum(ClientDenomination)
  clientDenomination: ClientDenomination;

  @ApiProperty()
  @IsEnum(ClientCategory)
  clientCategory: ClientCategory;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  nationalityCompany: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  agreementNumber: string;

  @ApiProperty()
  @IsDate()
  agreementDate: Date;

  @ApiProperty()
  @IsString()
  @IsUUID()
  contractTypeId: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(ContractType)
  contractType: ContractType;

  @ApiProperty()
  @IsOptional()
  @IsEnum(ContractContainer)
  contractContainer: ContractContainer;

  @ApiProperty()
  @IsString()
  contractNumber: string;

  @ApiProperty()
  @IsDate()
  contractDate: Date;

  @ApiProperty()
  @IsDate()
  contractValidity: Date;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @ValidateNested()
  supplements: SupplementDto[];

  @ApiProperty()
  @IsOptional()
  @IsString()
  observations: string;
}
