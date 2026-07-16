import { IsString, IsOptional, IsUUID, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { QueryStatus } from '../../../common/enums';

export class SubmitSearchQueryDto {
  @ApiProperty() @IsString() @MaxLength(500) query: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() indexId?: string;
}

export class SearchQueryFilterDto {
  @ApiPropertyOptional({ enum: QueryStatus }) @IsOptional() status?: QueryStatus;
}
