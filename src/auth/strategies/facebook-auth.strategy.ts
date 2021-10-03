import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, StrategyOption } from 'passport-facebook';
import { CONFIG_KEY } from 'src/shared/constant';

export type fnDone = (err: any, user: any, info?: any) => void;

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
	//profileFields value: https://developers.facebook.com/docs/graph-api/reference/v2.5/user
	constructor(private readonly configService: ConfigService) {
		super({
			clientID: configService.get<string>(CONFIG_KEY.FacebookAppId),
			clientSecret: configService.get<string>(CONFIG_KEY.FacebookSecret),
			callbackURL: configService.get<string>(CONFIG_KEY.FacebookCallbackUrl),
			profileFields: ['name', 'email', 'picture'],
		} as StrategyOption);
	}

	async validate(accessToken: string, refreshToken: string, profile: Profile, done: fnDone) {
		console.log(accessToken);
		console.log(refreshToken);
		console.log(profile._json);
		done(null, profile._json);
	}
}
