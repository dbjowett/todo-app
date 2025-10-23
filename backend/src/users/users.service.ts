import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/database/database.service';

interface NewUser {
  email: string;
  password: string;
}

export interface User {
  email: string;
  password: string;
  id: number;
}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(
    email: string,
    password: string,
  ): Promise<{ id: number; email: string }> {
    const hashed = await bcrypt.hash(password, 10);
    const user: NewUser = { email, password: hashed };

    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('User already exists, please login instead.');
    }

    const newUser = await this.prisma.user.create({ data: user });
    return { id: newUser.id, email: newUser.email };
  }

  async findByEmail(email: string): Promise<User | null> {
    if (!email) return null;
    return this.prisma.user.findUnique({ where: { email } });
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }
}
