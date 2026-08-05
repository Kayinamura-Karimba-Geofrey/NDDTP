import { Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';

export interface DualAuthorizationRequest {
  id: string;
  actionType: 'STRATEGIC_ASSET_DISPATCH' | 'ARMORY_VAULT_UNLOCK' | 'CRITICAL_BUDGET_RELEASE';
  initiatedBy: string;
  firstSignature: { officerId: string; signedAt: string };
  secondSignature?: { officerId: string; signedAt: string };
  status: 'PENDING_SECOND_SIGNATURE' | 'APPROVED' | 'REJECTED';
  metadata: Record<string, unknown>;
}

@Injectable()
export class DualAuthorizationService {
  private requests: Map<string, DualAuthorizationRequest> = new Map();

  createRequest(actionType: DualAuthorizationRequest['actionType'], officerId: string, metadata: Record<string, unknown>): DualAuthorizationRequest {
    const id = `TWO-MAN-${Date.now()}`;
    const req: DualAuthorizationRequest = {
      id,
      actionType,
      initiatedBy: officerId,
      firstSignature: { officerId, signedAt: new Date().toISOString() },
      status: 'PENDING_SECOND_SIGNATURE',
      metadata,
    };
    this.requests.set(id, req);
    return req;
  }

  signSecondAuthorization(requestId: string, secondOfficerId: string): DualAuthorizationRequest {
    const req = this.requests.get(requestId);
    if (!req) throw new BadRequestException('Request not found');
    if (req.status !== 'PENDING_SECOND_SIGNATURE') throw new BadRequestException('Request is already processed');

    // Enforcement: Two-Man Rule requires TWO DIFFERENT commanding officers!
    if (req.firstSignature.officerId === secondOfficerId) {
      throw new ForbiddenException('Two-Man Rule Violation: Second authorization signature must come from a different commanding officer!');
    }

    req.secondSignature = { officerId: secondOfficerId, signedAt: new Date().toISOString() };
    req.status = 'APPROVED';
    this.requests.set(requestId, req);
    return req;
  }
}
