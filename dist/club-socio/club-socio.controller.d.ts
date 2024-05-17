import { ClubSocioService } from './club-socio.service';
import { SocioEntity } from '../socio/socio.entity/socio.entity';
import { SocioDto } from 'src/socio/socio.dto/socio.dto';
export declare class ClubSocioController {
    private readonly clubSocioService;
    constructor(clubSocioService: ClubSocioService);
    addMemberToClub(clubId: string, socioId: string): Promise<import("../club/club.entity/club.entity").ClubEntity>;
    findMemberFromClub(clubId: string, socioId: string): Promise<SocioEntity>;
    findMembersFromClub(clubId: string): Promise<SocioEntity[]>;
    updateMembersFromClub(sociosDto: SocioDto[], clubId: string): Promise<import("../club/club.entity/club.entity").ClubEntity>;
    deleteMemberFromClub(clubId: string, socioId: string): Promise<import("../club/club.entity/club.entity").ClubEntity>;
}
