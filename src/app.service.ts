import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  logout(): string {
    return 'You just logged out of the server';
  }
}
