import { Body, Controller, Post } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentSignupDto } from './dto';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Post('signup')
  signup(@Body() dto: StudentSignupDto) {
    return this.studentService.signup();
  }
}
