import { IsUUID, IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateScheduleDto {
  @ApiProperty() @IsUUID() definitionId: string;
  @ApiProperty() @IsString() cronExpression: string;
  @ApiPropertyOptional() @IsOptional() @IsString() notes?: string;
}
