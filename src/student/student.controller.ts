import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
import { EnrollDto } from './dto';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @UseGuards(AuthGuard)
  @Get(':id')
  getStudent(@Param('id') id) {
    return this.studentService.findOne(parseInt(id));
  }

  @UseGuards(AuthGuard)
  @Patch(':id/update-profile')
  updateProfile(@Body() dto: Student, @Param('id') id) {
    return this.studentService.updateProfile(dto, parseInt(id));
  }

  @UseGuards(AuthGuard)
  @Post(':id/enroll')
  enroll(@Body() dto: EnrollDto, @Param('id') studentId) {
    const { courseId } = dto;
    return this.studentService.enroll(parseInt(studentId), parseInt(courseId));
  }

  @UseGuards(AuthGuard)
  @Get(':id/courses')
  getCourses(@Param('id') id) {
    return this.studentService.getCourses(parseInt(id));
  }

  @UseGuards(AuthGuard)
  @Delete(':id/unsubscribe')
  unsubscribe(@Param('id') id, @Body() data: { ids: string }) {
    const newIdsString = data.ids.split(',');
    const ids = newIdsString.map((id) => parseInt(id));
    return this.studentService.unsubscribe(parseInt(id), ids);
  }
}
