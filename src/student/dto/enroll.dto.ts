import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class EnrollDto {
  @ApiProperty({
    description: 'the id of the enrolling course ',
    example: 1,
  })
  @IsString()
  @IsNotEmpty()
  courseId: string;
}
