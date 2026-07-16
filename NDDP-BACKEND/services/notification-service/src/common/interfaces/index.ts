export interface SendNotificationPayload {
  userId: string;
  templateCode: string;
  channel: string;
  recipientEmail?: string;
  recipientPhone?: string;
  variables?: Record<string, string>;
}
