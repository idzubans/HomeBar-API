import { Controller, Request, UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('ingredients')
export class IngredientsController {

  @Get()
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return 
  }
}
