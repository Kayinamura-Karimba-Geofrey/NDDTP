import {
  Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, ParseUUIDPipe, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import {
  CreateUserDto, UpdateUserDto, UserFilterDto, CreateAddressDto, CreateEmergencyContactDto, UserResponseDto,
} from './dto/user.dto';
import { JwtAuthGuard, PermissionsGuard } from '@nddtp/platform-core';
import { RequirePermissions } from '@nddtp/platform-core';
import { CurrentUser, CorrelationId } from '../../decorators/current-user.decorator';

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @RequirePermissions('personnel:write:profile')
  @ApiOperation({ summary: 'Create user profile (step 1 of onboarding)' })
  create(@Body() dto: CreateUserDto, @CorrelationId() cid: string) {
    return this.userService.create(dto, cid);
  }

  @Get()
  @RequirePermissions('personnel:read:profile')
  @ApiOperation({ summary: 'List users with search and filters' })
  findAll(@Query() filter: UserFilterDto) {
    return this.userService.findAll(filter);
  }

  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  getMe(@CurrentUser('sub') userId: string) {
    return this.userService.getMe(userId);
  }

  @Get(':id')
  @RequirePermissions('personnel:read:profile')
  @ApiOperation({ summary: 'Get user by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findById(id);
  }

  @Put(':id')
  @RequirePermissions('personnel:write:profile')
  @ApiOperation({ summary: 'Update user profile' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateUserDto,
    @CorrelationId() cid: string,
  ) {
    return this.userService.update(id, dto, cid);
  }

  @Post(':id/deactivate')
  @RequirePermissions('personnel:write:profile')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Deactivate user' })
  deactivate(@Param('id', ParseUUIDPipe) id: string, @CorrelationId() cid: string) {
    return this.userService.deactivate(id, cid);
  }

  @Delete(':id')
  @RequirePermissions('personnel:write:profile')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Soft-delete user' })
  remove(@Param('id', ParseUUIDPipe) id: string, @CorrelationId() cid: string) {
    return this.userService.delete(id, cid);
  }

  @Post(':id/addresses')
  @RequirePermissions('personnel:write:profile')
  @ApiOperation({ summary: 'Add user address' })
  addAddress(@Param('id', ParseUUIDPipe) id: string, @Body() dto: CreateAddressDto) {
    return this.userService.addAddress(id, dto);
  }

  @Post(':id/emergency-contacts')
  @RequirePermissions('personnel:write:profile')
  @ApiOperation({ summary: 'Add emergency contact' })
  addEmergencyContact(@Param('id', ParseUUIDPipe) id: string, @Body() dto: CreateEmergencyContactDto) {
    return this.userService.addEmergencyContact(id, dto);
  }
}
