import { ApiProperty } from '@nestjs/swagger';
import { RoleType } from '../../commons/types/modles.types';
import { IsEnum, IsString, IsStrongPassword, MinLength } from 'class-validator';

export default class CreateUserDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  name: string;
  @ApiProperty()
  @IsString()
  @MinLength(1)
  username: string;
  @ApiProperty()
  @IsString()
  @IsStrongPassword()
  password: string;
  @ApiProperty()
  @IsEnum(RoleType)
  role: RoleType;
}
