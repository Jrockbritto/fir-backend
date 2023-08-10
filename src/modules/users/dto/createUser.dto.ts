import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({ type: String, example: 'lorem' })
  @IsString()
  name: string;

  @ApiProperty({ type: String, example: 'ipsum' })
  @IsString()
  lastName: string;

  @ApiProperty({ type: String, example: 'loremipsum@gmail.com' })
  @IsString()
  email: string;

  @ApiProperty({ type: String, example: 'Teste1234@' })
  @IsString()
  password: string;
}
