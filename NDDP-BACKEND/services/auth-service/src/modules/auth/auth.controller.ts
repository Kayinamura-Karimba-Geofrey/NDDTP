import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  RegisterDto,
  LoginDto,
  RefreshTokenDto,
  LogoutDto,
  ChangePasswordDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  VerifyMfaDto,
} from './dto/auth.dto';
import {
  TokenResponseDto,
  UserProfileResponseDto,
  MessageResponseDto,
  MfaRequiredResponseDto,
  LoginAttemptResponseDto,
} from './dto/auth-response.dto';
import { LoginAttemptFilterDto } from './dto/auth-filter.dto';
import { Public } from '../../decorators/auth.decorators';
import { CurrentUser, ClientIp, UserAgent, CorrelationId } from '../../decorators/current-user.decorator';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { Throttle } from '@nestjs/throttler';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Register new user credentials' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  async register(
    @Body() dto: RegisterDto,
    @CorrelationId() correlationId: string,
  ) {
    return this.authService.register(dto, correlationId);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @ApiOperation({ summary: 'Authenticate user and obtain tokens' })
  @ApiResponse({ status: 200, type: TokenResponseDto })
  @ApiResponse({ status: 401, type: MfaRequiredResponseDto, description: 'MFA required' })
  async login(
    @Body() dto: LoginDto,
    @ClientIp() ipAddress: string,
    @UserAgent() userAgent: string,
    @CorrelationId() correlationId: string,
  ) {
    return this.authService.login(
      dto,
      { ipAddress, userAgent, deviceId: dto.deviceId, deviceName: dto.deviceName },
      correlationId,
    );
  }

  @Public()
  @Post('mfa/verify')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @ApiOperation({ summary: 'Verify MFA code and complete login' })
  @ApiResponse({ status: 200, type: TokenResponseDto })
  async verifyMfa(
    @Body() dto: VerifyMfaDto,
    @ClientIp() ipAddress: string,
    @UserAgent() userAgent: string,
    @CorrelationId() correlationId: string,
  ) {
    return this.authService.verifyMfa(dto, { ipAddress, userAgent }, correlationId);
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh access token using refresh token' })
  @ApiResponse({ status: 200, type: TokenResponseDto })
  async refresh(
    @Body() dto: RefreshTokenDto,
    @ClientIp() ipAddress: string,
    @UserAgent() userAgent: string,
    @CorrelationId() correlationId: string,
  ) {
    return this.authService.refreshToken(
      dto.refreshToken,
      { ipAddress, userAgent },
      correlationId,
    );
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout and revoke session' })
  @ApiResponse({ status: 200, type: MessageResponseDto })
  async logout(
    @CurrentUser('sub') userId: string,
    @CurrentUser('sessionId') sessionId: string,
    @Body() dto: LogoutDto,
    @CorrelationId() correlationId: string,
  ) {
    return this.authService.logout(userId, sessionId, dto.refreshToken, correlationId);
  }

  @Post('change-password')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Change user password' })
  @ApiResponse({ status: 200, type: MessageResponseDto })
  async changePassword(
    @CurrentUser('sub') userId: string,
    @Body() dto: ChangePasswordDto,
    @CorrelationId() correlationId: string,
  ) {
    return this.authService.changePassword(userId, dto, correlationId);
  }

  @Public()
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 3, ttl: 300000 } })
  @ApiOperation({ summary: 'Request password reset' })
  @ApiResponse({ status: 200, type: MessageResponseDto })
  async forgotPassword(
    @Body() dto: ForgotPasswordDto,
    @ClientIp() ipAddress: string,
    @CorrelationId() correlationId: string,
  ) {
    return this.authService.forgotPassword(dto, ipAddress, correlationId);
  }

  @Public()
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reset password using token' })
  @ApiResponse({ status: 200, type: MessageResponseDto })
  async resetPassword(
    @Body() dto: ResetPasswordDto,
    @CorrelationId() correlationId: string,
  ) {
    return this.authService.resetPassword(dto, correlationId);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get authenticated user profile' })
  @ApiResponse({ status: 200, type: UserProfileResponseDto })
  async getProfile(@CurrentUser('sub') userId: string) {
    return this.authService.getProfile(userId);
  }

  @Get('login-history')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get login attempt history for the current user' })
  @ApiResponse({ status: 200, type: LoginAttemptResponseDto, isArray: true })
  async getLoginHistory(
    @CurrentUser('sub') userId: string,
    @Query() filter: LoginAttemptFilterDto,
  ) {
    return this.authService.getLoginHistory(userId, filter.page || 1, filter.limit || 20);
  }
}
