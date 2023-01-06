import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthController } from './auth/auth.controller';
import { IngredientsModule } from './ingredients/ingredients.module';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule, IngredientsModule, CqrsModule],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
