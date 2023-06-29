import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class StudentSignupDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  passwordConfirmation: string;

  @IsString()
  country: string;
}
