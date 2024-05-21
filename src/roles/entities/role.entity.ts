import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Role {
    @PrimaryGeneratedColumn() id: number;
    @Column() name: string;
    @Column() is_active: boolean;
    @CreateDateColumn() created_at: Date;
    @UpdateDateColumn() updated_at: Date;
    @OneToMany(type => User, (user) => user.role) users: User[];
}

