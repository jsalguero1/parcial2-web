import { SocioEntity } from './socio.entity/socio.entity';
import { Repository } from 'typeorm';
export declare class SocioService {
    private readonly socioRepository;
    constructor(socioRepository: Repository<SocioEntity>);
    findAll(): Promise<SocioEntity[]>;
    findOne(id: string): Promise<SocioEntity>;
    create(socio: SocioEntity): Promise<SocioEntity>;
    update(id: string, socio: SocioEntity): Promise<SocioEntity>;
    delete(id: string): Promise<void>;
}
