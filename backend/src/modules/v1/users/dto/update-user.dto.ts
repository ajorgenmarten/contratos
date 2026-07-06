import { ApiProperty } from '@nestjs/swagger';
import { RoleType } from '../../commons/types/modles.types';
import {
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export default class UpdateUserDto {
  @ApiProperty()
  @IsUUID()
  userId: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(5)
  name: string;
  @ApiProperty()
  @IsOptional()
  @IsEnum(RoleType)
  role: RoleType;
}
