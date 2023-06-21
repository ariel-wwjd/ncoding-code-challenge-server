import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [CourseService],
})
export class CourseModule {}
