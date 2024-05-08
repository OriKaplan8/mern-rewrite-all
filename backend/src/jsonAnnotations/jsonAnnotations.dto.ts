import { IsNotEmpty } from 'class-validator';

export class jsonAnnotationsDto {
    @IsNotEmpty()
    file_id: string;

    @IsNotEmpty()
    json_data: Record<string, any>;

    @IsNotEmpty()
    username: string;
}
