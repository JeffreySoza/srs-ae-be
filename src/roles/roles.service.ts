import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) { }

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const role = this.rolesRepository.create(createRoleDto);
    return this.rolesRepository.save(role);
  }

  findAll(): Promise<Role[]> {
    return this.rolesRepository.find();
  }

  findOne(id: number): Promise<Role | null> {
    return this.rolesRepository.findOneBy({ id });
  }

  async update(id: number, updateRoleDto: CreateRoleDto): Promise<Role> {
    await this.rolesRepository.update(id, updateRoleDto);
    return this.rolesRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.rolesRepository.delete(id);
  }
}
