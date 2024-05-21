import { IsString, IsInt, IsDateString, IsBoolean } from 'class-validator';

export class CreateUserDto {
    @IsString() name: string;
    @IsString() password: string;
    @IsString() email: string;
    @IsString() photo: string;
    @IsDateString() email_verified_at: Date;
    @IsBoolean() is_active: boolean;
    @IsDateString() created_at: Date;
    @IsDateString() updated_at: Date;
    @IsInt() role_id: number;
}
