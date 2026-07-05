import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LeaveBalanceRepository } from './repositories/leave-balance.repository';
import { LeaveTypeRepository } from '../leave-types/repositories/leave-type.repository';
import { EventPublisherService } from '../../events/event-publisher.service';
import { RedisService } from '../cache/redis.module';
import { CACHE_KEYS } from '../../common/constants';
import { getCurrentYear } from '../../common/utils/leave-days.util';

@Injectable()
export class LeaveBalanceService {
  constructor(
    private readonly repo: LeaveBalanceRepository,
    private readonly typeRepo: LeaveTypeRepository,
    private readonly publisher: EventPublisherService,
    private readonly redis: RedisService,
    private readonly cs: ConfigService,
  ) {}

  async getBalances(userId: string, year = getCurrentYear()) {
    const cached = await this.redis.get(CACHE_KEYS.BALANCE(userId, year));
    if (cached) return JSON.parse(cached);

    let balances = await this.repo.findByUserAndYear(userId, year);
    if (!balances.length) {
      balances = await this.initializeBalances(userId, year);
    }

    const response = balances.map((b) => ({
      id: b.id,
      leaveTypeId: b.leaveTypeId,
      leaveTypeCode: b.leaveType?.code,
      leaveTypeName: b.leaveType?.name,
      year: b.year,
      totalDays: Number(b.totalDays),
      usedDays: Number(b.usedDays),
      pendingDays: Number(b.pendingDays),
      availableDays: Number(b.totalDays) - Number(b.usedDays) - Number(b.pendingDays),
    }));

    const ttl = this.cs.get<number>('redis.ttl.balance') || 600;
    await this.redis.set(CACHE_KEYS.BALANCE(userId, year), JSON.stringify(response), ttl);
    return response;
  }

  async initializeBalances(userId: string, year: number) {
    const types = await this.typeRepo.findAll();
    const created: Awaited<ReturnType<LeaveBalanceRepository['findByUserAndYear']>> = [];
    for (const lt of types) {
      const existing = await this.repo.findByUserTypeYear(userId, lt.id, year);
      if (!existing) {
        await this.repo.create({
          userId,
          leaveTypeId: lt.id,
          year,
          totalDays: Number(lt.defaultDays),
          usedDays: 0,
          pendingDays: 0,
        });
      }
    }
    return this.repo.findByUserAndYear(userId, year);
  }

  async reserveDays(userId: string, leaveTypeId: string, days: number, year = getCurrentYear()): Promise<{ ok: boolean; available: number }> {
    const balance = await this.repo.findByUserTypeYear(userId, leaveTypeId, year);
    if (!balance) {
      await this.initializeBalances(userId, year);
      return this.reserveDays(userId, leaveTypeId, days, year);
    }
    const available = Number(balance.totalDays) - Number(balance.usedDays) - Number(balance.pendingDays);
    if (days > available) return { ok: false, available };

    await this.repo.update(balance.id, { pendingDays: Number(balance.pendingDays) + days });
    await this.invalidateCache(userId, year);
    await this.publisher.publishBalanceUpdated({ userId, leaveTypeId, year, pendingDays: days, action: 'reserve' });
    return { ok: true, available: available - days };
  }

  async confirmDays(userId: string, leaveTypeId: string, days: number, year = getCurrentYear()) {
    const balance = await this.repo.findByUserTypeYear(userId, leaveTypeId, year);
    if (!balance) return;
    await this.repo.update(balance.id, {
      pendingDays: Math.max(0, Number(balance.pendingDays) - days),
      usedDays: Number(balance.usedDays) + days,
    });
    await this.invalidateCache(userId, year);
    await this.publisher.publishBalanceUpdated({ userId, leaveTypeId, year, usedDays: days, action: 'confirm' });
  }

  async releaseDays(userId: string, leaveTypeId: string, days: number, year = getCurrentYear()) {
    const balance = await this.repo.findByUserTypeYear(userId, leaveTypeId, year);
    if (!balance) return;
    await this.repo.update(balance.id, {
      pendingDays: Math.max(0, Number(balance.pendingDays) - days),
    });
    await this.invalidateCache(userId, year);
    await this.publisher.publishBalanceUpdated({ userId, leaveTypeId, year, pendingDays: days, action: 'release' });
  }

  private async invalidateCache(userId: string, year: number) {
    await this.redis.del(CACHE_KEYS.BALANCE(userId, year));
  }
}
