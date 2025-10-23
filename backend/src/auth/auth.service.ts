import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string) {
    const existing = await this.usersService.findByEmail(email);
    if (existing) throw new UnauthorizedException('User already exists');
    const user = await this.usersService.create(email, password);
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.usersService.validateUser(email, password);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, email: user.email };
    return {
      accessToken: this.jwtService.sign(payload),
      user: { id: user.id, email: user.email },
    };
  }

  async logout(userId: number) {
    // If including refresh tokens invalidate here
    return { message: `User with ID ${userId} logged out successfully.` };
  }
}
