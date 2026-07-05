import { IsUUID, IsString, IsOptional, IsEnum, IsNumber, Min, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ExpenditureStatus, ExpenditureReferenceType } from '../../../common/enums';
import { PaginationDto } from '../../../common/dto/pagination.dto';

export class CreateExpenditureDto {
  @ApiProperty() @IsUUID() accountId: string;
  @ApiProperty() @IsUUID() budgetId: string;
  @ApiProperty() @IsNumber() @Min(0.01) amount: number;
  @ApiProperty() @IsString() @MaxLength(300) purpose: string;
  @ApiPropertyOptional({ enum: ExpenditureReferenceType }) @IsOptional() @IsEnum(ExpenditureReferenceType) referenceType?: ExpenditureReferenceType;
  @ApiPropertyOptional() @IsOptional() @IsUUID() referenceId?: string;
}

export class RejectExpenditureDto {
  @ApiProperty() @IsString() rejectionReason: string;
}

export class ExpenditureFilterDto extends PaginationDto {
  @ApiPropertyOptional({ enum: ExpenditureStatus }) @IsOptional() @IsEnum(ExpenditureStatus) status?: ExpenditureStatus;
  @ApiPropertyOptional() @IsOptional() @IsUUID() accountId?: string;
}
