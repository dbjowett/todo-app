import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

class AuthDto {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: AuthDto) {
    return this.authService.register(body.email, body.password);
  }

  @Post('login')
  async login(@Body() body: AuthDto) {
    console.log('HERE');
    return this.authService.login(body.email, body.password);
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  async logout(@Request() req) {
    return this.authService.logout(req.user.id);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
