import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private rolesService: RolesService, // Inject RolesService
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { role_id, ...userData } = createUserDto;
    const role = await this.rolesService.findOne(role_id);

    if (!role) {
      throw new Error('Role not found');
    }

    const user = this.usersRepository.create({ ...userData, role });
    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['role'] });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  findOneById(userId: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id: userId });
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  userExists(email: string): Promise<boolean> {
    return this.usersRepository.exists({ where: { email } });
  }
}
