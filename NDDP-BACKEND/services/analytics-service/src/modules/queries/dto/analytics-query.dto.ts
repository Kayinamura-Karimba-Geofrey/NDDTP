import { IsObject, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAnalyticsQueryDto {
  @ApiPropertyOptional() @IsOptional() @IsObject() parameters?: Record<string, unknown>;
}

export class CompleteAnalyticsQueryDto {
  @ApiProperty() @IsObject() result: Record<string, unknown>;
}

export class FailAnalyticsQueryDto {
  @ApiPropertyOptional() @IsOptional() @IsString() errorMessage?: string;
}
