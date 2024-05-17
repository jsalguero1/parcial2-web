import { ClubService } from './club.service';
import { ClubEntity } from './club.entity/club.entity';
import { ClubDto } from './club.dto/club.dto';
export declare class ClubController {
    private readonly clubService;
    constructor(clubService: ClubService);
    findAll(): Promise<ClubEntity[]>;
    findOne(clubId: string): Promise<ClubEntity>;
    create(clubDto: ClubDto): Promise<ClubEntity>;
    update(clubId: string, clubDto: ClubDto): Promise<ClubEntity>;
    delete(clubId: string): Promise<void>;
}
