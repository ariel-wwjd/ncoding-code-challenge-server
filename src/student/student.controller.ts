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
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiUnauthorizedResponse,
  ApiOkResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { StudentService } from './student.service';
import { Student } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
import { EnrollDto, DeleteCourses } from './dto';

@ApiTags('Student')
@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get a student by id' })
  @ApiParam({ name: 'id' })
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  getStudent(@Param('id') id) {
    return this.studentService.findOne(parseInt(id));
  }

  @UseGuards(AuthGuard)
  @Patch(':id/update-profile')
  @ApiOperation({ summary: 'Update student profile' })
  @ApiParam({ name: 'id' })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ description: 'Successful update' })
  @ApiResponse({ status: 403, description: 'Student not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  updateProfile(@Body() dto: Student, @Param('id') id) {
    return this.studentService.updateProfile(dto, parseInt(id));
  }

  @UseGuards(AuthGuard)
  @Post(':id/enroll')
  @ApiOperation({ summary: 'Enroll to a course' })
  @ApiParam({ name: 'id' })
  @ApiBearerAuth('JWT-auth')
  @ApiCreatedResponse({ description: 'Successful enroll' })
  @ApiResponse({
    status: 403,
    description: 'Student not found or already enrolled',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  enroll(@Body() dto: EnrollDto, @Param('id') studentId) {
    const { courseId } = dto;
    return this.studentService.enroll(parseInt(studentId), parseInt(courseId));
  }

  @UseGuards(AuthGuard)
  @Get(':id/courses')
  @ApiOperation({ summary: 'Get Student Courses' })
  @ApiParam({ name: 'id' })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ description: 'Enrolled courses' })
  @ApiResponse({ status: 403, description: 'Student not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  getCourses(@Param('id') id) {
    return this.studentService.getCourses(parseInt(id));
  }

  @UseGuards(AuthGuard)
  @Delete(':id/unsubscribe')
  @ApiOperation({ summary: 'Delete enrolled courses' })
  @ApiParam({ name: 'id' })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ description: 'Deleted courses' })
  @ApiResponse({ status: 403, description: 'Student not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  unsubscribe(@Param('id') id, @Body() data: DeleteCourses) {
    const newIdsString = data.ids.split(',');
    const ids = newIdsString.map((id) => parseInt(id));
    return this.studentService.unsubscribe(parseInt(id), ids);
  }
}
