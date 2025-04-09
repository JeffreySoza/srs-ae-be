import { Body, Controller, Post, HttpCode, HttpStatus, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuardGuard } from './auth-guard/auth-guard.guard';
import { SignInDto } from './dto/sign-in.dto';
import { SkipAuthGuard } from '../public/public.decorator'; // Import the Public decorator

@Controller('auth')
export class AuthController {
    constructor(private auth: AuthService) { }

    @SkipAuthGuard() // This route will be public and won't require authentication guard
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: SignInDto) {
        return this.auth.signIn(signInDto.email, signInDto.password);
    }

    @UseGuards(AuthGuardGuard) // this is kinda unnecessary now since the guard is applied to every route by declaring it on the module
    @Get('profile')
    getProfile(@Request() request) {
        return request.user;
    }

    // @UseGuards(AuthGuardGuard)
    @SkipAuthGuard() // This route will be public and won't require authentication
    @Get('noAuth')
    NoAuth() {
        return 'No auth route - no authentication required';
    }
}
