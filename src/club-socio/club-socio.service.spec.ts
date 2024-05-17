import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { ClubEntity } from '../club/club.entity/club.entity';
import { SocioEntity } from '../socio/socio.entity/socio.entity';
import { ClubSocioService } from './club-socio.service';
import { faker } from '@faker-js/faker';
import { BusinessLogicException } from '../shared/errors/business-errors';

describe('ClubSocioService', () => {
  let service: ClubSocioService;
  let clubRepository: Repository<ClubEntity>;
  let socioRepository: Repository<SocioEntity>;
  let club: ClubEntity;
  let sociosList: SocioEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ClubSocioService],
    }).compile();

    service = module.get<ClubSocioService>(ClubSocioService);
    clubRepository = module.get<Repository<ClubEntity>>(getRepositoryToken(ClubEntity));
    socioRepository = module.get<Repository<SocioEntity>>(getRepositoryToken(SocioEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    socioRepository.clear();
    clubRepository.clear();

    sociosList = [];
    for (let i = 0; i < 5; i++) {
      const socio: SocioEntity = await socioRepository.save({
        nombre: faker.person.fullName(),
        email: faker.internet.email(),
        birthday: faker.date.past(),
        clubs: []
      });
      sociosList.push(socio);
    }

    club = await clubRepository.save({
      nombre: faker.company.name(),
      foundationDate: faker.date.past(),
      image: faker.image.url(),
      description: faker.lorem.sentence(),
      socios: sociosList
    });
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addMemberToClub should add a socio to a club', async () => {
    const newSocio: SocioEntity = await socioRepository.save({
      nombre: faker.person.fullName(),
      email: faker.internet.email(),
      birthday: faker.date.past(),
    });

    const newClub: ClubEntity = await clubRepository.save({
      nombre: faker.company.name(),
      foundationDate: faker.date.past(),
      image: faker.image.url(),
      description: faker.lorem.sentence(),
    });

    const result: ClubEntity = await service.addMemberToClub(newSocio.id, newClub.id);
    
    expect(result.socios.length).toBe(1);
    expect(result.socios[0]).not.toBeNull();
    expect(result.socios[0].nombre).toBe(newSocio.nombre);
    expect(result.socios[0].email).toBe(newSocio.email);
    expect(result.socios[0].birthday).toStrictEqual(newSocio.birthday);
  });

  it('addMemberToClub should throw an exception for an invalid socio', async () => {
    const newClub: ClubEntity = await clubRepository.save({
      nombre: faker.company.name(),
      foundationDate: faker.date.past(),
      image: faker.image.url(),
      description: faker.lorem.sentence(),
    });

    await expect(() => service.addMemberToClub("0", newClub.id)).rejects.toHaveProperty("message", "Socio not found");
  });

  it('addMemberToClub should throw an exception for an invalid club', async () => {
    const newSocio: SocioEntity = await socioRepository.save({
      nombre: faker.person.fullName(),
      email: faker.internet.email(),
      birthday: faker.date.past(),
    });

    await expect(() => service.addMemberToClub(newSocio.id, "0")).rejects.toHaveProperty("message", "Club not found");
  });

  it('findMembersFromClub should return socios by club', async () => {
    const socios: SocioEntity[] = await service.findMembersFromClub(club.id);
    expect(socios.length).toBe(5);
  });

  it('findMembersFromClub should throw an exception for an invalid club', async () => {
    await expect(() => service.findMembersFromClub("0")).rejects.toHaveProperty("message", "club not found");
  });

  it('findMemberFromClub should return socio by club and socio', async () => {
    const socio: SocioEntity = sociosList[0];
    const storedSocio: SocioEntity = await service.findMemberFromClub(club.id, socio.id);
    expect(storedSocio).not.toBeNull();
    expect(storedSocio.nombre).toBe(socio.nombre);
    expect(storedSocio.email).toBe(socio.email);
    expect(storedSocio.birthday).toStrictEqual(socio.birthday);
  });

  it('findMemberFromClub should throw an exception for an invalid socio', async () => {
    await expect(() => service.findMemberFromClub(club.id, "0")).rejects.toHaveProperty("message", "Socio not found");
  });

  it('findMemberFromClub should throw an exception for an invalid club', async () => {
    const socio: SocioEntity = sociosList[0];
    await expect(() => service.findMemberFromClub("0", socio.id)).rejects.toHaveProperty("message", "club not found");
  });

  it('findMemberFromClub should throw an exception for a socio not associated to the club', async () => {
    const newSocio: SocioEntity = await socioRepository.save({
      nombre: faker.person.fullName(),
      email: faker.internet.email(),
      birthday: faker.date.past(),
    });

    await expect(() => service.findMemberFromClub(club.id, newSocio.id)).rejects.toHaveProperty("message", "Socio not found");
  });

  it('updateMembersFromClub should update socios list for a club', async () => {
    const newSocio: SocioEntity = await socioRepository.save({
      nombre: faker.person.fullName(),
      email: faker.internet.email(),
      birthday: faker.date.past(),
    });

    const updatedClub: ClubEntity = await service.updateMembersFromClub(club.id, [newSocio]);
    expect(updatedClub.socios.length).toBe(1);
    expect(updatedClub.socios[0].nombre).toBe(newSocio.nombre);
    expect(updatedClub.socios[0].email).toBe(newSocio.email);
    expect(updatedClub.socios[0].birthday).toBe(newSocio.birthday);
  });

  it('updateMembersFromClub should throw an exception for an invalid club', async () => {
    const newSocio: SocioEntity = await socioRepository.save({
      nombre: faker.person.fullName(),
      email: faker.internet.email(),
      birthday: faker.date.past(),
    });

    await expect(() => service.updateMembersFromClub("0", [newSocio])).rejects.toHaveProperty("message", "Club not found");
  });

  it('updateMembersFromClub should throw an exception for an invalid socio', async () => {
    const newSocio: SocioEntity = sociosList[0];
    newSocio.id = "0";

    await expect(() => service.updateMembersFromClub(club.id, [newSocio])).rejects.toHaveProperty("message", "Socio not found");
  });

  it('deleteMemberFromClub should remove a socio from a club', async () => {
    const socio: SocioEntity = sociosList[0];
    await service.deleteMemberFromClub(club.id, socio.id);

    const storedClub: ClubEntity = await clubRepository.findOne({ where: { id: club.id }, relations: ["socios"] });
    const deletedSocio: SocioEntity = storedClub.socios.find(a => a.id === socio.id);

    expect(deletedSocio).toBeUndefined();
  });

  it('deleteMemberFromClub should throw an exception for an invalid socio', async () => {
    await expect(() => service.deleteMemberFromClub(club.id, "0")).rejects.toHaveProperty("message", "Socio not found");
  });

  it('deleteMemberFromClub should throw an exception for an invalid club', async () => {
    const socio: SocioEntity = sociosList[0];
    await expect(() => service.deleteMemberFromClub("0", socio.id)).rejects.toHaveProperty("message", "Club not found");
  });

  it('deleteMemberFromClub should throw an exception for a socio not associated to the club', async () => {
    const newSocio: SocioEntity = await socioRepository.save({
      nombre: faker.person.fullName(),
      email: faker.internet.email(),
      birthday: faker.date.past(),
    });

    await expect(() => service.deleteMemberFromClub(club.id, newSocio.id)).rejects.toHaveProperty("message", "Socio not found");
  });
});
