import { IsString, IsDateString, IsBoolean } from 'class-validator';

export class CreateRoleDto {
    @IsString() name: string;
    @IsBoolean() is_active: boolean;
    @IsDateString() created_at: Date;
    @IsDateString() updated_at: Date;
}
