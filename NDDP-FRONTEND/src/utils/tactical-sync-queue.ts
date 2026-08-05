export interface OfflineQueueItem {
  id: string;
  endpoint: string;
  method: 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  payload: Record<string, unknown>;
  timestamp: string;
  retries: number;
}

export class TacticalSyncQueue {
  private static STORAGE_KEY = 'nddtp_tactical_offline_queue';

  static getQueue(): OfflineQueueItem[] {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  static enqueue(item: Omit<OfflineQueueItem, 'id' | 'timestamp' | 'retries'>): OfflineQueueItem {
    const queue = this.getQueue();
    const newItem: OfflineQueueItem = {
      ...item,
      id: `SYNC-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      timestamp: new Date().toISOString(),
      retries: 0,
    };
    queue.push(newItem);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(queue));
    return newItem;
  }

  static dequeue(id: string): void {
    const queue = this.getQueue().filter((i) => i.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(queue));
  }

  static clearQueue(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  static async syncPendingItems(dispatchRequest: (item: OfflineQueueItem) => Promise<boolean>): Promise<{ synced: number; failed: number }> {
    const queue = this.getQueue();
    let synced = 0;
    let failed = 0;

    for (const item of queue) {
      try {
        const success = await dispatchRequest(item);
        if (success) {
          this.dequeue(item.id);
          synced++;
        } else {
          failed++;
        }
      } catch {
        failed++;
      }
    }

    return { synced, failed };
  }
}
