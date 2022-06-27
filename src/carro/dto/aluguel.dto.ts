import { IsInt, IsNotEmpty, IsString, Length } from "class-validator";

export class AluguelDto {
    @IsString()
    @Length(11, 11)
    @IsNotEmpty()
    clienteCpf: string;

    @IsInt()
    @IsNotEmpty()
    carroId: number;
}