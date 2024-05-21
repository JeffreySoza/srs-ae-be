import { Role } from 'src/roles/entities/role.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn() id: number;
    @Column() name: string;
    @Column({ default: 'admin' }) password: string;
    @Column() email: string;
    @Column({ nullable: true }) photo: string;
    @Column({ type: 'timestamp', nullable: true }) email_verified_at: Date;
    @Column() is_active: boolean;
    @CreateDateColumn() created_at: Date;
    @UpdateDateColumn() updated_at: Date;
    @ManyToOne(type => Role, (role) => role.users) role: Role;
}
