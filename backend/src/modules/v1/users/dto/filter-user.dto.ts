import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export default class FilterUserDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  search: string;
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  page: number;
}
