import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { LoginClientDto } from './dto/login-client.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login-admin')
  loginAdmin(@Body() login: LoginDto) {
    return this.authService.signInAdmin(login);
  }

  @Post('login-client')
  loginClient(@Body() login: LoginClientDto) {
    return this.authService.signInClient(login);
  }

  @UseGuards(AuthGuard)
  @Post('create-admin')
  async createAdmin(@Req() req) {
    return req.user_admin;
  }
}
