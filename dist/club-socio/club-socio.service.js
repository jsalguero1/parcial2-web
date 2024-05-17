"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClubSocioService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const club_entity_1 = require("../club/club.entity/club.entity");
const business_errors_1 = require("../shared/errors/business-errors");
const socio_entity_1 = require("../socio/socio.entity/socio.entity");
const typeorm_2 = require("typeorm");
let ClubSocioService = class ClubSocioService {
    constructor(clubRepository, socioRepository) {
        this.clubRepository = clubRepository;
        this.socioRepository = socioRepository;
    }
    async addMemberToClub(socioId, clubId) {
        const club = await this.clubRepository.findOne({ where: { id: clubId }, relations: ['socios'] });
        if (!club) {
            throw new business_errors_1.BusinessLogicException('Club not found', business_errors_1.BusinessError.NOT_FOUND);
        }
        const socio = await this.socioRepository.findOne({ where: { id: socioId } });
        if (!socio) {
            throw new business_errors_1.BusinessLogicException('Socio not found', business_errors_1.BusinessError.NOT_FOUND);
        }
        club.socios = [...club.socios, socio];
        return await this.clubRepository.save(club);
    }
    async findMembersFromClub(clubId) {
        const club = await this.clubRepository.findOne({ where: { id: clubId }, relations: ['socios'] });
        if (!club) {
            throw new business_errors_1.BusinessLogicException('club not found', business_errors_1.BusinessError.NOT_FOUND);
        }
        return club.socios;
    }
    async findMemberFromClub(clubId, socioId) {
        const club = await this.clubRepository.findOne({ where: { id: clubId }, relations: ['socios'] });
        if (!club) {
            throw new business_errors_1.BusinessLogicException('club not found', business_errors_1.BusinessError.NOT_FOUND);
        }
        const socio = club.socios.find(socio => socio.id === socioId);
        if (!socio) {
            throw new business_errors_1.BusinessLogicException('Socio not found', business_errors_1.BusinessError.NOT_FOUND);
        }
        return socio;
    }
    async updateMembersFromClub(clubId, socios) {
        const club = await this.clubRepository.findOne({ where: { id: clubId }, relations: ['socios'] });
        if (!club) {
            throw new business_errors_1.BusinessLogicException('Club not found', business_errors_1.BusinessError.NOT_FOUND);
        }
        for (let i = 0; i < socios.length; i++) {
            const socio = await this.socioRepository.findOne({ where: { id: socios[i].id } });
            if (!socio) {
                throw new business_errors_1.BusinessLogicException('Socio not found', business_errors_1.BusinessError.NOT_FOUND);
            }
        }
        club.socios = socios;
        return await this.clubRepository.save(club);
    }
    async deleteMemberFromClub(clubId, socioId) {
        const club = await this.clubRepository.findOne({ where: { id: clubId }, relations: ['socios'] });
        if (!club) {
            throw new business_errors_1.BusinessLogicException('Club not found', business_errors_1.BusinessError.NOT_FOUND);
        }
        const socio = club.socios.find(socio => socio.id === socioId);
        if (!socio) {
            throw new business_errors_1.BusinessLogicException('Socio not found', business_errors_1.BusinessError.NOT_FOUND);
        }
        club.socios = club.socios.filter(socio => socio.id !== socioId);
        return await this.clubRepository.save(club);
    }
};
exports.ClubSocioService = ClubSocioService;
exports.ClubSocioService = ClubSocioService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(club_entity_1.ClubEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(socio_entity_1.SocioEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ClubSocioService);
//# sourceMappingURL=club-socio.service.js.map