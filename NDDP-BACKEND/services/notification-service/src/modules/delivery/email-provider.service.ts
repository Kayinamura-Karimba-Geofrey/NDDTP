import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';

export interface EmailPayload {
  to: string;
  subject: string;
  body: string;
  html?: boolean;
}

@Injectable()
export class EmailProviderService implements OnModuleInit {
  private readonly logger = new Logger(EmailProviderService.name);
  private transporter: Transporter | null = null;

  constructor(private readonly cs: ConfigService) {}

  onModuleInit(): void {
    this.transporter = nodemailer.createTransport({
      host: this.cs.get<string>('smtp.host'),
      port: this.cs.get<number>('smtp.port'),
      secure: this.cs.get<boolean>('smtp.secure'),
      auth: this.cs.get<string>('smtp.user') ? {
        user: this.cs.get<string>('smtp.user'),
        pass: this.cs.get<string>('smtp.password'),
      } : undefined,
    });
    this.logger.log('Email transporter initialized');
  }

  async send(payload: EmailPayload): Promise<{ messageId: string }> {
    if (!this.transporter) throw new Error('Email transporter not initialized');

    const result = await this.transporter.sendMail({
      from: this.cs.get<string>('smtp.from'),
      to: payload.to,
      subject: payload.subject,
      text: payload.html ? undefined : payload.body,
      html: payload.html ? payload.body : undefined,
    });

    this.logger.log(`Email sent to ${payload.to}: ${result.messageId}`);
    return { messageId: result.messageId || 'unknown' };
  }
}
