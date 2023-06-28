import { Controller, Get, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('course')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @UseGuards(AuthGuard)
  @Get('all')
  getCourses() {
    return this.courseService.getAll();
  }
}
