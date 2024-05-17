import { ClubEntity } from "src/club/club.entity/club.entity";
export declare class SocioEntity {
    id: string;
    nombre: string;
    email: string;
    birthday: Date;
    clubs: ClubEntity[];
}
