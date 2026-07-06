import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsUUID } from 'class-validator';

export default class DisableUserDto {
  @ApiProperty()
  @IsUUID()
  userId: string;
  @ApiProperty()
  @IsBoolean()
  active: boolean;
}
