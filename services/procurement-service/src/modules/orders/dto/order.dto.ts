import { IsUUID, IsOptional, IsString, IsArray, ValidateNested, IsInt, Min, IsNumber, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PaginationDto } from '../../../common/dto/pagination.dto';
import { OrderStatus } from '../../../common/enums';

export class OrderItemDto {
  @ApiProperty() @IsString() description: string;
  @ApiProperty() @IsInt() @Min(1) quantity: number;
  @ApiProperty() @IsNumber() @Min(0) unitPrice: number;
  @ApiPropertyOptional() @IsOptional() @IsString() unit?: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() inventoryItemId?: string;
}

export class CreateOrderDto {
  @ApiProperty() @IsUUID() vendorId: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() requisitionId?: string;
  @ApiPropertyOptional() @IsOptional() @IsDateString() expectedDelivery?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() notes?: string;
  @ApiProperty({ type: [OrderItemDto] }) @IsArray() @ValidateNested({ each: true }) @Type(() => OrderItemDto) items: OrderItemDto[];
}

export class OrderFilterDto extends PaginationDto {
  @ApiPropertyOptional({ enum: OrderStatus }) @IsOptional() status?: OrderStatus;
  @ApiPropertyOptional() @IsOptional() @IsUUID() vendorId?: string;
}
