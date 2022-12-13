import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersController } from './users/users.controller';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule],
  controllers: [AppController, UsersController, AuthController],
  providers: [AppService],
})
export class AppModule {}
