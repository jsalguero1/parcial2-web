import { Module } from '@nestjs/common';
import { ClubSocioService } from './club-socio.service';
import { ClubSocioController } from './club-socio.controller';

@Module({
  providers: [ClubSocioService],
  controllers: [ClubSocioController]
})
export class ClubSocioModule {}
