import { SocioService } from './socio.service';
import { SocioEntity } from './socio.entity/socio.entity';
import { SocioDto } from './socio.dto/socio.dto';
export declare class SocioController {
    private readonly socioService;
    constructor(socioService: SocioService);
    findAll(): Promise<SocioEntity[]>;
    findOne(socioId: string): Promise<SocioEntity>;
    create(socioDto: SocioDto): Promise<SocioEntity>;
    update(socioId: string, socioDto: SocioDto): Promise<SocioEntity>;
    delete(socioId: string): Promise<void>;
}
