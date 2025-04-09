import { Controller, Get, Post, Body, Patch, Param, Delete, Redirect } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SkipAuthGuard } from '../public/public.decorator'; // Import the Public decorator

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  
  @SkipAuthGuard() // This route will be public and won't require authentication
  @Get('all')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('youtube')
  @Redirect(`https://www.youtube.com/watch?v=E0k2nDZM1qA&list=RDHqbdpotUdcQ&index=7&ab_channel=Zame`, 302)
  goToYoutube() {
    return;
  }
  // THESE 2 METHODS, ABOVE ONE AND UNDERNEATH ONE, have conflicts because youtube endpoint is interpreted as get and expects a parameter, putting this first helps solve this problem
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

}
