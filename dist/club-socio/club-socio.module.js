"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClubSocioModule = void 0;
const common_1 = require("@nestjs/common");
const club_socio_service_1 = require("./club-socio.service");
const club_socio_controller_1 = require("./club-socio.controller");
const typeorm_1 = require("@nestjs/typeorm");
const club_entity_1 = require("../club/club.entity/club.entity");
const socio_entity_1 = require("../socio/socio.entity/socio.entity");
let ClubSocioModule = class ClubSocioModule {
};
exports.ClubSocioModule = ClubSocioModule;
exports.ClubSocioModule = ClubSocioModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([club_entity_1.ClubEntity, socio_entity_1.SocioEntity])],
        providers: [club_socio_service_1.ClubSocioService],
        controllers: [club_socio_controller_1.ClubSocioController]
    })
], ClubSocioModule);
//# sourceMappingURL=club-socio.module.js.map