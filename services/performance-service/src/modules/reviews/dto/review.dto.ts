import { IsString, IsOptional, IsEnum, IsUUID, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PaginationDto } from '@nddtp/platform-core';
import { ReviewStatus, RatingLevel } from '../../../common/enums';

export class RatingItemDto {
  @ApiProperty() @IsUUID() criteriaId: string;
  @ApiProperty({ enum: RatingLevel }) @IsEnum(RatingLevel) rating: RatingLevel;
  @ApiPropertyOptional() @IsOptional() @IsString() comments?: string;
}

export class CreateReviewDto {
  @ApiProperty() @IsUUID() cycleId: string;
}

export class SubmitSelfAssessmentDto {
  @ApiProperty() @IsString() selfAssessment: string;
}

export class SubmitManagerReviewDto {
  @ApiProperty() @IsString() managerComments: string;
  @ApiProperty({ enum: RatingLevel }) @IsEnum(RatingLevel) overallRating: RatingLevel;
  @ApiProperty({ type: [RatingItemDto] }) @IsArray() @ValidateNested({ each: true }) @Type(() => RatingItemDto) ratings: RatingItemDto[];
}

export class ReviewFilterDto extends PaginationDto {
  @ApiPropertyOptional({ enum: ReviewStatus }) @IsOptional() @IsEnum(ReviewStatus) status?: ReviewStatus;
  @ApiPropertyOptional() @IsOptional() @IsUUID() userId?: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() cycleId?: string;
}
