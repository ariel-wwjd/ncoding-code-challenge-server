import * as argon from 'argon2';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, SignupDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private config: ConfigService,
    private prisma: PrismaService,
  ) {}

  async signup(dto: SignupDto) {
    const {
      password,
      passwordConfirmation,
      email,
      firstName,
      lastName,
      country,
    } = dto;

    if (password !== passwordConfirmation) {
      throw new ForbiddenException('Passwords does not match');
    }

    try {
      const hash = await argon.hash(password);
      const student = await this.prisma.student.create({
        data: {
          email,
          country,
          first_name: firstName,
          last_name: lastName,
          password: hash,
        },
      });

      const payload = { sub: student.id, username: student.email };

      return {
        access_token: await this.jwtService.signAsync(payload, {
          secret: this.config.get('JWT_SECRET'),
          expiresIn: '5min',
        }),
      };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('Credentials taken');
      }
      throw error;
    }
  }

  async login(dto: LoginDto) {
    const { email, password } = dto;
    const student = await this.prisma.student.findUnique({
      where: {
        email: email,
      },
    });

    const passwordMatches = await argon.verify(student.password, password);

    if (!passwordMatches) {
      throw new ForbiddenException('Credentials incorrect');
    }
    const payload = { sub: student.id, username: email };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: this.config.get('JWT_SECRET'),
        expiresIn: '60min',
      }),
    };
  }
}
