import { Module } from '@nestjs/common';
import { StudentModule } from './student/student.module';
import { CourseModule } from './course/course.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    StudentModule,
    CourseModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}
