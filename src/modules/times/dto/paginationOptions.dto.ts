import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginationOptions {
  @ApiProperty({
    type: Number,
    example: 1,
  })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  page: number;

  @ApiProperty({
    type: Number,
    example: 5,
  })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  perPage: number;
}
