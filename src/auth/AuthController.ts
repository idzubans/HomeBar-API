import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserPayloadDto } from 'src/users/commands/createUser/CreateUserPayloadDto';
import { CreateUserCommand } from 'src/users/commands/createUser/CreateUserCommand';
import { GetUserDto } from 'src/users/queries/getUserById/GetUserDto';
import { AccessTokenDto } from './AccessTokenDto';
import { AuthService } from './AuthService';
import { JwtAuthGuard } from './guards/JwtAuthGuard';
import { LocalAuthGuard } from './guards/LocalAuthGuard';
import { LoginUserDto } from './LoginDto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private commandBus: CommandBus) { }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Body() loginUserDto: LoginUserDto): Promise<AccessTokenDto> {
    return this.authService.getAccessToken(loginUserDto.email);
  }

  @Post('register')
  async register(@Body() request: CreateUserPayloadDto): Promise<GetUserDto> {
    const user = await this.commandBus.execute(
      new CreateUserCommand(request)
    );
    const { password, ...result } = user;
    return result;
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return 'authenticated';
  }
}
