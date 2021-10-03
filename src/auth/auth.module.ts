import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { FacebookStrategy } from './strategies/facebook-auth.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [ConfigModule],
	controllers: [AuthController],
	providers: [AuthService, FacebookStrategy],
})
export class AuthModule {}
