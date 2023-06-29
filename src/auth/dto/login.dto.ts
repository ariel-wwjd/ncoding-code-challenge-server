import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'The students email',
    example: 'benjamin@email.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The students password',
    example: 'very secure',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
