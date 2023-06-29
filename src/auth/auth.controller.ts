import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Register a new student' })
  @ApiResponse({
    status: 403,
    description: 'Credential are taken or Passwords do not match',
  })
  @ApiBadRequestResponse({ description: 'Email or Password is missing' })
  @ApiCreatedResponse({
    description: 'Student Created',
  })
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Login a Student' })
  @ApiOkResponse({ description: 'successful login' })
  @ApiBadRequestResponse({ description: 'Email or Password is missing' })
  @ApiResponse({
    status: 403,
    description: 'Credentials incorrect',
  })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
