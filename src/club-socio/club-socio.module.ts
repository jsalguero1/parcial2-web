import { Module } from '@nestjs/common';
import { ClubSocioService } from './club-socio.service';
import { ClubSocioController } from './club-socio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubEntity } from 'src/club/club.entity/club.entity';
import { SocioEntity } from 'src/socio/socio.entity/socio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClubEntity, SocioEntity])],
  providers: [ClubSocioService],
  controllers: [ClubSocioController]
})
export class ClubSocioModule {}
