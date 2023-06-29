import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteCourses {
  @ApiProperty({
    description: 'the ids of the courses to be deleted coma separated ',
    example: '1, 3',
  })
  @IsString()
  @IsNotEmpty()
  ids: string;
}
