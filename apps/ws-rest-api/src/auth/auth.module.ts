import { CacheModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MYSQL_MAIN_CONNECTION } from '@samec/databases/constants/db.constants';
import { JWT_SECRET } from '@samec/databases/constants/jwt.constants';
import { ProfileRepository } from '@samec/databases/repositories/ProfileRepository';
import { UserRepository } from '@samec/databases/repositories/UserRepository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [UserRepository, ProfileRepository],
      MYSQL_MAIN_CONNECTION,
    ),
    CacheModule.register({
      ttl: 5, // seconds
      max: 10000, // maximum number of items in cache
    }),
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
