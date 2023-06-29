import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Student } from '@prisma/client';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: number) {
    const student = await this.prisma.student.findUnique({
      where: {
        id: id,
      },
    });

    return student;
  }

  async updateProfile(dto: Student, id: number) {
    try {
      const updatedStudent = await this.prisma.student.update({
        where: {
          id,
        },
        data: {
          ...dto,
        },
      });

      delete updatedStudent.password;

      return updatedStudent;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new ForbiddenException('The student is not found');
      }
      throw error;
    }
  }

  async enroll(studentId: number, courseId: number) {
    try {
      const courses = await this.prisma.enroll.findMany({
        where: {
          student_id: studentId,
        },
      });

      const currentCourse = courses.find(
        (current) => current.course_id === courseId,
      );

      if (currentCourse) {
        throw new ForbiddenException('the course is already enrolled');
      }

      const enrolled = await this.prisma.enroll.create({
        data: {
          student_id: studentId,
          course_id: courseId,
        },
      });

      return enrolled;
    } catch (error) {
      if (error.code === 'P2003') {
        throw new ForbiddenException('The student is not found');
      }
      throw error;
    }
  }

  async getCourses(id: number) {
    try {
      const coursesIds = await this.prisma.enroll.findMany({
        where: {
          student_id: id,
        },
      });

      const coursesPromise = [];
      coursesIds.forEach(async (current) => {
        const course = this.prisma.course.findUnique({
          where: {
            id: current.course_id,
          },
        });
        coursesPromise.push(course);
      });

      const courses = Promise.all(coursesPromise)
        .then((response) => response)
        .catch((error) => error);

      return courses;
    } catch (error) {
      throw error;
    }
  }

  async unsubscribe(id: number, ids: number[]) {
    try {
      const currentCourses = await this.prisma.enroll.findMany({
        where: {
          student_id: id,
        },
      });

      const idsToDelete = [];

      ids.forEach((id) => {
        currentCourses.forEach((current) => {
          if (current.course_id === id) {
            idsToDelete.push(current.id);
          }
        });
      });

      const unsubscribePromises = [];
      idsToDelete.forEach((idToDelete) => {
        const promise = this.prisma.enroll.delete({
          where: {
            id: idToDelete,
          },
        });
        unsubscribePromises.push(promise);
      });

      const unsubscribed = Promise.all(unsubscribePromises)
        .then((response) => response)
        .catch((error) => error);

      return unsubscribed;
    } catch (error) {
      throw error;
    }
  }
}
