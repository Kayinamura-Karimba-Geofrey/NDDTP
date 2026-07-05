import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TaskStatus } from '../../../common/enums';
import { PaginationDto } from '../../../common/dto/pagination.dto';

export class DecideTaskDto {
  @ApiPropertyOptional() @IsOptional() @IsString() comments?: string;
}

export class TaskFilterDto extends PaginationDto {
  @ApiPropertyOptional({ enum: TaskStatus }) @IsOptional() @IsEnum(TaskStatus) status?: TaskStatus;
}
