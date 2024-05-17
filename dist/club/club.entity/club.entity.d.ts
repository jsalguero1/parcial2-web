import { SocioEntity } from "src/socio/socio.entity/socio.entity";
export declare class ClubEntity {
    id: string;
    nombre: string;
    foundationDate: Date;
    image: string;
    description: string;
    socios: SocioEntity[];
}
