import { Module } from '@nestjs/common';
import { AuthModule } from './auth/AuthModule';
import { UsersModule } from './users/UsersModule';
import { PrismaModule } from './prisma/PrismaModule';
import { AuthController } from './auth/AuthController';
import { IngredientsModule } from './ingredients/IngredientsModule';
import { CqrsModule } from '@nestjs/cqrs';
import { DrinksModule } from './drinks/DrinksModule';
import { PartyModule } from './party/PartyModule';

@Module({
  imports: [
    AuthModule, 
    PrismaModule, 
    CqrsModule, 
    UsersModule, 
    IngredientsModule, 
    DrinksModule,
    PartyModule
  ],
  controllers: [AuthController],
})
export class AppModule {}
