import { IsUUID, IsString, IsEnum, IsOptional, IsDateString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CalendarEventType, EventStatus } from '../../../common/enums';
import { PaginationDto } from '../../../common/dto/pagination.dto';

export class CreateEventDto {
  @ApiProperty() @IsUUID() calendarId: string;
  @ApiProperty() @IsString() @MaxLength(200) title: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
  @ApiPropertyOptional({ enum: CalendarEventType }) @IsOptional() @IsEnum(CalendarEventType) eventType?: CalendarEventType;
  @ApiProperty() @IsDateString() startTime: string;
  @ApiProperty() @IsDateString() endTime: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(300) location?: string;
}

export class EventFilterDto extends PaginationDto {
  @ApiPropertyOptional() @IsOptional() @IsUUID() calendarId?: string;
  @ApiPropertyOptional({ enum: EventStatus }) @IsOptional() @IsEnum(EventStatus) status?: EventStatus;
  @ApiPropertyOptional() @IsOptional() @IsDateString() from?: string;
  @ApiPropertyOptional() @IsOptional() @IsDateString() to?: string;
}
