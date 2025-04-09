import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from "../constants";
import { IS_PUBLIC_KEY } from '../../public/public.decorator'; // Import the custom Public decorator metadata
import { Reflector } from '@nestjs/core'; // Import Reflector to access metadata

@Injectable()
export class AuthGuardGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const handler = context.getHandler();

    // Check if the route is marked as public
    const isPublic = this.reflector.get<boolean>(IS_PUBLIC_KEY, handler);
    if (isPublic) {
      return true; // If it's public, skip the authentication check
    }

    // If not public, check the authorization header for a valid token
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, { secret: jwtConstants.secret });
      request['user'] = payload; // Attach the decoded user payload to the request
    } catch (error) {
      throw new UnauthorizedException(`Error verifying token: ${error}`);
    }
    return true;
  }


  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
