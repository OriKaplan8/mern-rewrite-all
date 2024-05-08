import { IsNotEmpty } from 'class-validator';

export class jsonBatchesDto {
    @IsNotEmpty()
    project_name: string;

    @IsNotEmpty()
    uploaded_time: Date;

    @IsNotEmpty()
    file_id: string;

    @IsNotEmpty()
    json_data: Record<string, any>;
}
