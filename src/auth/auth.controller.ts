import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { request, Request } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Get('facebook')
	@UseGuards(AuthGuard('facebook'))
	async facebookAuth(): Promise<any> {}

	@Get('facebook/callback')
	@UseGuards(AuthGuard('facebook'))
	async facebookLoginCallback(@Req() request: Request): Promise<any> {
		return request.user;
	}

	@Get('google')
	@UseGuards(AuthGuard('google'))
	async googleAuth(): Promise<any> {}

	@Get('google/callback')
	@UseGuards(AuthGuard('google'))
	async googleLoginCallback(@Req() request: Request): Promise<any> {
		return request.user;
	}
}
