import { Body, Controller, Post } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentLoginDto, StudentSignupDto } from './dto';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Post('signup')
  signup(@Body() dto: StudentSignupDto) {
    return this.studentService.signup(dto);
  }

  @Post('login')
  login(@Body() dto: StudentLoginDto) {
    return this.studentService.login(dto);
  }
}
