import { IsString, IsOptional, IsEnum, IsUUID, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AttendanceStatus } from '../../../common/enums';

export class RecordAttendanceDto {
  @ApiProperty() @IsUUID() enrollmentId: string;
  @ApiProperty() @IsDateString() attendanceDate: string;
  @ApiProperty({ enum: AttendanceStatus }) @IsEnum(AttendanceStatus) status: AttendanceStatus;
  @ApiPropertyOptional() @IsOptional() @IsString() notes?: string;
}
