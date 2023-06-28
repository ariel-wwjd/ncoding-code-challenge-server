import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    try {
      return await this.prisma.course.findMany();
    } catch (error) {
      throw error;
    }
  }
}
