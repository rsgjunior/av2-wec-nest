import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString, Length } from "class-validator";

export class AluguelDto {
    @IsString()
    @Length(11, 11)
    @IsNotEmpty()
    @ApiProperty()
    clienteCpf: string;

    @IsInt()
    @IsNotEmpty()
    @ApiProperty()
    carroId: number;
}