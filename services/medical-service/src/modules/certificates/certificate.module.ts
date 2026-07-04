import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalCertificate } from '../../database/entities/medical-certificate.entity';
import { CertificateController } from './certificate.controller';
import { CertificateService } from './certificate.service';
import { CertificateRepository } from './repositories/certificate.repository';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalCertificate]), EventsModule],
  controllers: [CertificateController],
  providers: [CertificateService, CertificateRepository],
})
export class CertificateModule {}
