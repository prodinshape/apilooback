import { ApiProperty } from '@nestjs/swagger';

export class CreateCallDto {
  @ApiProperty()
  url: string;
}
