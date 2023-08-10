import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

import { Time } from '../entity/Time.entity';

export class CreateTimeResponseDTO {
  @ApiProperty({
    type: Time,
    example: {
      userId: '7a6aa1c0-2af2-4db8-9fc9-3d62c3e7ea49',
      time: '2023-08-09T08:47:27.502Z',
      deletedAt: null,
      id: 'b11ae28a-f12a-405a-b32a-b1e83a86eabc',
      createdAt: '2023-08-09T14:47:27.506Z',
      updatedAt: '2023-08-09T14:47:27.506Z',
    },
  })
  @ValidateNested()
  @Type(() => Time)
  time: Time;
}
