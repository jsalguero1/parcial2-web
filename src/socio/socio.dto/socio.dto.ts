import { IsNotEmpty, IsString, IsUrl, isURL } from "class-validator";
export class SocioDto {
    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsString()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly birthday: Date;
}
