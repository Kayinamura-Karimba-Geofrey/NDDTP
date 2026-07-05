import { IsString, IsUUID, IsOptional, IsEnum, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '@nddtp/platform-core';
import { AccountStatus } from '../../../common/enums';

export class CreateCostAccountDto {
  @ApiProperty() @IsString() @MaxLength(50) code: string;
  @ApiProperty() @IsString() @MaxLength(200) name: string;
  @ApiProperty() @IsUUID() categoryId: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() departmentId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
}

export class AccountFilterDto extends PaginationDto {
  @ApiPropertyOptional({ enum: AccountStatus }) @IsOptional() @IsEnum(AccountStatus) status?: AccountStatus;
  @ApiPropertyOptional() @IsOptional() @IsUUID() categoryId?: string;
}
