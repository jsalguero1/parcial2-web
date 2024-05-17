import { ClubEntity } from '../club/club.entity/club.entity';
import { SocioEntity } from '../socio/socio.entity/socio.entity';
import { Repository } from 'typeorm';
export declare class ClubSocioService {
    private readonly clubRepository;
    private readonly socioRepository;
    constructor(clubRepository: Repository<ClubEntity>, socioRepository: Repository<SocioEntity>);
    addMemberToClub(socioId: string, clubId: string): Promise<ClubEntity>;
    findMembersFromClub(clubId: string): Promise<SocioEntity[]>;
    findMemberFromClub(clubId: string, socioId: string): Promise<SocioEntity>;
    updateMembersFromClub(clubId: string, socios: SocioEntity[]): Promise<ClubEntity>;
    deleteMemberFromClub(clubId: string, socioId: string): Promise<ClubEntity>;
}
