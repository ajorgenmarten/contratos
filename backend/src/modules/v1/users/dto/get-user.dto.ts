import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export default class GetUserDto {
  @ApiProperty()
  @IsString()
  @IsUUID()
  id: string;
}
