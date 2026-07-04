import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { MfaService } from './mfa.service';
import { MfaSetupVerifyDto, MfaDisableDto } from '../auth/dto/auth.dto';
import { MfaSetupResponseDto, MessageResponseDto } from '../auth/dto/auth-response.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CurrentUser, CorrelationId } from '../../decorators/current-user.decorator';
import { AuthCredentialRepository } from '../credentials/repositories/auth-credential.repository';
import { ResourceNotFoundException } from '../../common/exceptions/auth.exceptions';

@ApiTags('MFA')
@Controller('mfa')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class MfaController {
  constructor(
    private readonly mfaService: MfaService,
    private readonly credentialRepository: AuthCredentialRepository,
  ) {}

  @Post('setup')
  @ApiOperation({ summary: 'Initiate MFA setup' })
  @ApiResponse({ status: 201, type: MfaSetupResponseDto })
  async setup(@CurrentUser('sub') userId: string) {
    const credential = await this.credentialRepository.findByUserId(userId);
    if (!credential) {
      throw new ResourceNotFoundException('Credential', userId);
    }

    return this.mfaService.initiateSetup(credential.id, credential.email);
  }

  @Post('setup/verify')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verify and enable MFA' })
  @ApiResponse({ status: 200, type: MessageResponseDto })
  async verifySetup(
    @CurrentUser('sub') userId: string,
    @Body() dto: MfaSetupVerifyDto,
    @CorrelationId() correlationId: string,
  ) {
    const credential = await this.credentialRepository.findByUserId(userId);
    if (!credential) {
      throw new ResourceNotFoundException('Credential', userId);
    }

    return this.mfaService.verifyAndEnable(credential.id, dto.code, correlationId);
  }

  @Post('disable')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Disable MFA' })
  @ApiResponse({ status: 200, type: MessageResponseDto })
  async disable(
    @CurrentUser('sub') userId: string,
    @Body() dto: MfaDisableDto,
    @CorrelationId() correlationId: string,
  ) {
    const credential = await this.credentialRepository.findByUserId(userId);
    if (!credential) {
      throw new ResourceNotFoundException('Credential', userId);
    }

    return this.mfaService.disable(credential.id, dto.password, dto.code, correlationId);
  }

  @Get('status')
  @ApiOperation({ summary: 'Get MFA status' })
  async status(@CurrentUser('sub') userId: string) {
    const credential = await this.credentialRepository.findByUserId(userId);
    if (!credential) {
      throw new ResourceNotFoundException('Credential', userId);
    }

    const enabled = await this.mfaService.isMfaEnabled(credential.id);
    return { mfaEnabled: enabled };
  }
}
