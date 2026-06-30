import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsStrongPassword, IsUUID } from 'class-validator';

export default class ResetPasswordDto {
  @ApiProperty()
  @IsString()
  @IsUUID()
  userId: string;
  @ApiProperty()
  @IsString()
  @IsStrongPassword()
  newPassword: string;
}
