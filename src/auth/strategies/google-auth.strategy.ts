import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, StrategyOptions, VerifyCallback } from 'passport-google-oauth20';
import { CONFIG_KEY } from 'src/shared/constant';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
	constructor(private readonly configService: ConfigService) {
		super({
			clientID: configService.get<string>(CONFIG_KEY.GoogleAppId),
			clientSecret: configService.get<string>(CONFIG_KEY.GoogleSecret),
			callbackURL: configService.get<string>(CONFIG_KEY.GoogleCallbackUrl),
			scope: ['openid', 'profile', 'email'],
		} as StrategyOptions);
	}

	async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) {
		done(null, profile);
	}
}
