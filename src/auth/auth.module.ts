import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { AuthGuardGuard } from './auth-guard/auth-guard.guard';
import { APP_GUARD } from '@nestjs/core'; // Import the APP_GUARD token

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' },
        }),
    ],
    providers: [AuthService
    //     , {
    //     provide: APP_GUARD, // Register the AuthGuard globally
    //     useClass: AuthGuardGuard, // The class you want to use globally
    // }
    ,],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule { }