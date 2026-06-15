import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export default class FilterContractDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  page: number;
  @ApiProperty()
  @IsOptional()
  @IsString()
  query: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  contractNumber: string;
}
