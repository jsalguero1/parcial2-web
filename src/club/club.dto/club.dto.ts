import { IsNotEmpty, IsString, IsUrl, isURL } from "class-validator";
export class ClubDto {

    @IsString()
    @IsNotEmpty()
    readonly nombre: string;
    
    @IsString()
    @IsNotEmpty()
    readonly foundationDate: Date;

    @IsUrl()
    @IsNotEmpty()
    readonly image: string;
    
    @IsString()
    @IsNotEmpty()
    readonly description: string;
}

