import { ClubEntity } from "../../club/club.entity/club.entity";
export declare class SocioEntity {
    id: string;
    nombre: string;
    email: string;
    birthday: Date;
    clubs: ClubEntity[];
}
