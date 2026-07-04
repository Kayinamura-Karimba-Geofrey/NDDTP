import { Controller, Get, Post, Param, Query, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { BookingService } from './booking.service';
import { CreateBookingDto, RejectBookingDto, BookingFilterDto } from './dto/booking.dto';
import { RequirePermissions, CurrentUser } from '../../decorators/auth.decorators';
import { AuthenticatedUser } from '../../common/interfaces';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('Space Bookings')
@ApiBearerAuth('access-token')
@Controller('bookings')
export class BookingController {
  constructor(private readonly service: BookingService) {}

  @Post()
  @RequirePermissions('facilities:read:bookings')
  @ApiOperation({ summary: 'Submit space booking request' })
  submit(@Body() dto: CreateBookingDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.submit(user.sub, dto);
  }

  @Get('me')
  @RequirePermissions('facilities:read:bookings')
  @ApiOperation({ summary: 'List my bookings' })
  mine(@CurrentUser() user: AuthenticatedUser, @Query() query: PaginationDto) {
    return this.service.findMine(user.sub, query.page, query.limit);
  }

  @Get()
  @RequirePermissions('facilities:manage:bookings')
  @ApiOperation({ summary: 'List all bookings (filtered)' })
  findAll(@Query() query: BookingFilterDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @RequirePermissions('facilities:read:bookings')
  @ApiOperation({ summary: 'Get booking by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Get(':id/logs')
  @RequirePermissions('facilities:read:bookings')
  @ApiOperation({ summary: 'Get booking activity logs' })
  findLogs(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findLogs(id);
  }

  @Post(':id/approve')
  @RequirePermissions('facilities:manage:bookings')
  @ApiOperation({ summary: 'Approve booking' })
  approve(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.approve(id, user.sub);
  }

  @Post(':id/reject')
  @RequirePermissions('facilities:manage:bookings')
  @ApiOperation({ summary: 'Reject booking' })
  reject(@Param('id', ParseUUIDPipe) id: string, @Body() dto: RejectBookingDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.reject(id, user.sub, dto);
  }

  @Post(':id/activate')
  @RequirePermissions('facilities:manage:bookings')
  @ApiOperation({ summary: 'Activate booking (in use)' })
  activate(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.activate(id, user.sub);
  }

  @Post(':id/complete')
  @RequirePermissions('facilities:manage:bookings')
  @ApiOperation({ summary: 'Complete booking' })
  complete(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.complete(id, user.sub);
  }

  @Post(':id/cancel')
  @RequirePermissions('facilities:read:bookings')
  @ApiOperation({ summary: 'Cancel own booking' })
  cancel(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.cancel(id, user.sub, false);
  }

  @Post(':id/cancel-staff')
  @RequirePermissions('facilities:manage:bookings')
  @ApiOperation({ summary: 'Cancel booking (staff)' })
  cancelStaff(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.service.cancel(id, user.sub, true);
  }
}
