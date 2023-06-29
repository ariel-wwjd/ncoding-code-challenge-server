import { Controller, Get, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Courses')
@Controller('course')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @UseGuards(AuthGuard)
  @Get('all')
  @ApiOperation({ summary: 'Get all courses' })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ description: 'Successful retrieve courses' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  getCourses() {
    return this.courseService.getAll();
  }
}
