import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAddress } from '../../../database/entities/user-address.entity';
import { UserEmergencyContact } from '../../../database/entities/user-emergency-contact.entity';

@Injectable()
export class UserAddressRepository {
  constructor(@InjectRepository(UserAddress) private readonly repo: Repository<UserAddress>) {}

  create(data: Partial<UserAddress>): Promise<UserAddress> {
    return this.repo.save(this.repo.create(data));
  }

  findByUserId(userId: string): Promise<UserAddress[]> {
    return this.repo.find({ where: { userId }, order: { isPrimary: 'DESC' } });
  }

  async clearPrimary(userId: string): Promise<void> {
    await this.repo.update({ userId, isPrimary: true }, { isPrimary: false });
  }
}

@Injectable()
export class UserEmergencyContactRepository {
  constructor(@InjectRepository(UserEmergencyContact) private readonly repo: Repository<UserEmergencyContact>) {}

  create(data: Partial<UserEmergencyContact>): Promise<UserEmergencyContact> {
    return this.repo.save(this.repo.create(data));
  }

  findByUserId(userId: string): Promise<UserEmergencyContact[]> {
    return this.repo.find({ where: { userId }, order: { isPrimary: 'DESC' } });
  }
}
