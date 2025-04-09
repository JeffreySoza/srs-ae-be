import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) { }

    async signIn(email: string, pass: string): Promise<{ access_token: string }> {
        try {
            const userExists = await this.userService.userExists(email);
            if (!userExists) throw new UnauthorizedException('User does not exist!' );

            const user = await this.userService.findOneByEmail(email);
            // const isPasswordValid = await bcrypt.compare(pass, user.password);
            if (user?.password !== pass) throw new UnauthorizedException('The password provided is not correct!' );

            const payload = { sub: user.id, username: user.email };
            const access_token = await this.jwtService.signAsync(payload);
            return { access_token };
        } catch (error) {
            throw new UnauthorizedException(`Error during sign-in: ${error}`);
        }
    }

}
