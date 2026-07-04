import { Controller, Get, Param, Query, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { LeaveBalanceService } from './leave-balance.service';
import { RequirePermissions, CurrentUser } from '../../decorators/auth.decorators';
import { AuthenticatedUser } from '../../common/interfaces';
import { Type } from 'class-transformer';
import { IsOptional, IsInt } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

class BalanceQueryDto {
  @ApiPropertyOptional()
  @IsOptional() @Type(() => Number) @IsInt()
  year?: number;
}

@ApiTags('Leave Balances')
@ApiBearerAuth('access-token')
@Controller('leave-balances')
export class LeaveBalanceController {
  constructor(private readonly service: LeaveBalanceService) {}

  @Get('me')
  @RequirePermissions('leave:read:requests')
  @ApiOperation({ summary: 'Get my leave balances' })
  myBalances(@CurrentUser() user: AuthenticatedUser, @Query() query: BalanceQueryDto) {
    return this.service.getBalances(user.sub, query.year);
  }

  @Get('users/:userId')
  @RequirePermissions('leave:approve:requests')
  @ApiOperation({ summary: 'Get leave balances for a user (HR/approver)' })
  userBalances(@Param('userId', ParseUUIDPipe) userId: string, @Query() query: BalanceQueryDto) {
    return this.service.getBalances(userId, query.year);
  }
}
