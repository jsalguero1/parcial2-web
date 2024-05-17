import { ClubEntity } from "src/club/club.entity/club.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class SocioEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    email: string;

    @Column()
    birthday: Date;

    @ManyToMany(()=> ClubEntity, club => club.socios)
    clubs: ClubEntity[];
}
