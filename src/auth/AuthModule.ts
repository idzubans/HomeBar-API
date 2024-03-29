import { Module } from '@nestjs/common';
import { AuthService } from './AuthService';
import { LocalStrategy } from './guards/LocalStrategy';
import { JwtStrategy } from './guards/JwtStrategy';
import { UsersModule } from '../users/UsersModule';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    CqrsModule
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}