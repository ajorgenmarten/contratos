import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsStrongPassword, MinLength } from 'class-validator';

export default class ChangePasswordDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  oldPassword: string;
  @ApiProperty()
  @IsString()
  @IsStrongPassword()
  newPassword: string;
}
