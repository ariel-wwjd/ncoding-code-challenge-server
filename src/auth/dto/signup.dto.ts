import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignupDto {
  @ApiProperty({
    description: 'The sign up data required from the student',
    example: 'benjamin@email.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The students first name',
    example: 'Benjamin',
    required: false,
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'The students last name',
    example: 'Mayer',
    required: false,
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'The password to login into the app',
    example: 'very secure',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description:
      'The password confirmation to make sure the password is correct',
    example: 'very secure',
  })
  @IsString()
  @IsNotEmpty()
  passwordConfirmation: string;

  @ApiProperty({
    description: 'The students country, this is optional',
    example: 'Swiss',
    required: false,
  })
  @IsString()
  country: string;
}
