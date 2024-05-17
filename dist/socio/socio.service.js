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
exports.SocioService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const socio_entity_1 = require("./socio.entity/socio.entity");
const typeorm_2 = require("typeorm");
const business_errors_1 = require("../shared/errors/business-errors");
let SocioService = class SocioService {
    constructor(socioRepository) {
        this.socioRepository = socioRepository;
    }
    async findAll() {
        return await this.socioRepository.find({ relations: ['clubs'] });
    }
    async findOne(id) {
        const socio = await this.socioRepository.findOne({ where: { id }, relations: ['clubs'] });
        if (!socio) {
            throw new business_errors_1.BusinessLogicException('Socio with the given id not found', business_errors_1.BusinessError.NOT_FOUND);
        }
        return socio;
    }
    async create(socio) {
        if (!socio.email.includes('@')) {
            throw new business_errors_1.BusinessLogicException('Email must have a valid domain', business_errors_1.BusinessError.PRECONDITION_FAILED);
        }
        return await this.socioRepository.save(socio);
    }
    async update(id, socio) {
        const persistedSocio = await this.socioRepository.findOne({ where: { id } });
        if (!persistedSocio) {
            throw new business_errors_1.BusinessLogicException('socio with the given id not found', business_errors_1.BusinessError.NOT_FOUND);
        }
        if (!socio.email.includes('@')) {
            throw new business_errors_1.BusinessLogicException('Email must have a valid domain', business_errors_1.BusinessError.PRECONDITION_FAILED);
        }
        return await this.socioRepository.save({ ...persistedSocio, ...socio });
    }
    async delete(id) {
        const socio = await this.socioRepository.findOne({ where: { id } });
        if (!socio) {
            throw new business_errors_1.BusinessLogicException('socio with the given id not found', business_errors_1.BusinessError.NOT_FOUND);
        }
        await this.socioRepository.remove(socio);
    }
};
exports.SocioService = SocioService;
exports.SocioService = SocioService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(socio_entity_1.SocioEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SocioService);
//# sourceMappingURL=socio.service.js.map