import { Module } from '@nestjs/common';
import { StudentModule } from './student/student.module';
import { CourseModule } from './course/course.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [StudentModule, CourseModule, PrismaModule],
})
export class AppModule {}
