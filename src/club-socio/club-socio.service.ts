import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClubEntity } from '../club/club.entity/club.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { SocioEntity } from '../socio/socio.entity/socio.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClubSocioService {
    constructor(
        @InjectRepository(ClubEntity)
        private readonly clubRepository: Repository<ClubEntity>,

        @InjectRepository(SocioEntity)
        private readonly socioRepository: Repository<SocioEntity>

    ) { }

    async addMemberToClub(socioId:string, clubId:string): Promise<ClubEntity>{
        const club: ClubEntity = await this.clubRepository.findOne({where:{id:clubId}, relations:['socios']});
        if (!club){
            throw new BusinessLogicException('Club not found', BusinessError.NOT_FOUND);
        }
        const socio: SocioEntity = await this.socioRepository.findOne({where:{id:socioId}});
        if (!socio){
            throw new BusinessLogicException('Socio not found', BusinessError.NOT_FOUND);
        }
        club.socios = [...club.socios, socio];
        return await this.clubRepository.save(club);
    }

    async findMembersFromClub(clubId:string): Promise<SocioEntity[]>{
        const club: ClubEntity = await this.clubRepository.findOne({where:{id:clubId}, relations:['socios']});
        if (!club){
            throw new BusinessLogicException('club not found', BusinessError.NOT_FOUND);
        }
        return club.socios;
    }

    async findMemberFromClub(clubId:string, socioId:string): Promise<SocioEntity>{
        const club:ClubEntity = await this.clubRepository.findOne({where:{id:clubId}, relations:['socios']});
        if (!club){
            throw new BusinessLogicException('club not found', BusinessError.NOT_FOUND);
        }
        const socio:SocioEntity = club.socios.find(socio => socio.id === socioId);
        if (!socio){
            throw new BusinessLogicException('Socio not found', BusinessError.NOT_FOUND);
        }
        return socio;
    }

    async updateMembersFromClub(clubId:string, socios:SocioEntity[]): Promise<ClubEntity>{
        const club: ClubEntity = await this.clubRepository.findOne({where:{id:clubId}, relations:['socios']});
        if (!club){
            throw new BusinessLogicException('Club not found', BusinessError.NOT_FOUND);
        }
        for(let i = 0; i < socios.length; i++){
            const socio: SocioEntity = await this.socioRepository.findOne({where:{id:socios[i].id}});
            if (!socio){
                throw new BusinessLogicException('Socio not found', BusinessError.NOT_FOUND);
            }
        }
        club.socios = socios;
        return await this.clubRepository.save(club);
    }

    async deleteMemberFromClub(clubId:string, socioId:string): Promise<ClubEntity>{
        const club: ClubEntity = await this.clubRepository.findOne({where:{id:clubId}, relations:['socios']});
        if (!club){
            throw new BusinessLogicException('Club not found', BusinessError.NOT_FOUND);
        }
        const socio: SocioEntity = club.socios.find(socio => socio.id === socioId);
        if (!socio){
            throw new BusinessLogicException('Socio not found', BusinessError.NOT_FOUND);
        }
        club.socios = club.socios.filter(socio => socio.id !== socioId);
        return await this.clubRepository.save(club);
    }
}
