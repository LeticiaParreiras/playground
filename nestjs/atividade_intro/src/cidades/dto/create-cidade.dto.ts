import { IsNumber, IsString } from "class-validator";

export class CreateCidadeDto {
        @IsString()
        nome: string;

        @IsNumber()
        uf_id: number;
    
}
