import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { StudentLoginDto, StudentSignupDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: StudentSignupDto) {
    const {
      password,
      email,
      firstName,
      lastName,
      country,
      passwordConfirmation,
    } = dto;

    if (password !== passwordConfirmation) {
      console.log('passwords miss match');
    }

    const hash = await argon.hash(password);

    try {
      const student = await this.prisma.student.create({
        data: {
          email,
          country,
          first_name: firstName,
          last_name: lastName,
          password: hash,
        },
      });

      delete student.password;
      return student;
    } catch (error) {
      console.log('-------------- error', error.code, '++++++++++++++++++');
      // if (error instanceof PrismaClientKnownRequestError) {}
      if (error.code === 'P2002') {
        throw new ForbiddenException('Credentials taken');
      }
      throw error;
    }
  }

  async login(dto: StudentLoginDto) {
    const { email, password } = dto;
    const student = await this.prisma.student.findUnique({
      where: {
        email: email,
      },
    });

    if (!student) {
      throw new ForbiddenException('Credentials incorrect');
    }

    const passwordMatches = await argon.verify(student.password, password);

    if (!passwordMatches) {
      throw new ForbiddenException('Credentials incorrect');
    }

    delete student.password;
    return student;
  }
}
