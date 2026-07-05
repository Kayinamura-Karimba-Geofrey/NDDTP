import { IsUUID, IsOptional, IsString, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '../../../common/dto/pagination.dto';
import { AlertSeverity, AlertStatus } from '../../../common/enums';

export class RaiseAlertDto {
  @ApiProperty() @IsUUID() checkId: string;
  @ApiPropertyOptional({ enum: AlertSeverity }) @IsOptional() @IsEnum(AlertSeverity) severity?: AlertSeverity;
  @ApiProperty() @IsString() message: string;
}

export class AlertFilterDto extends PaginationDto {
  @ApiPropertyOptional({ enum: AlertStatus }) @IsOptional() @IsEnum(AlertStatus) status?: AlertStatus;
  @ApiPropertyOptional({ enum: AlertSeverity }) @IsOptional() @IsEnum(AlertSeverity) severity?: AlertSeverity;
}
