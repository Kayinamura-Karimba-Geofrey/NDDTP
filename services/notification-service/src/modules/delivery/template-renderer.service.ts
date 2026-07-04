import { Injectable } from '@nestjs/common';
import { TemplateRenderException } from '../../common/exceptions/notification.exceptions';

@Injectable()
export class TemplateRendererService {
  render(template: string, variables: Record<string, string> = {}): string {
    return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
      if (variables[key] === undefined) {
        throw new TemplateRenderException(`Missing template variable: ${key}`);
      }
      return variables[key];
    });
  }

  extractVariables(template: string): string[] {
    const matches = template.match(/\{\{(\w+)\}\}/g) || [];
    return [...new Set(matches.map((m) => m.replace(/\{\{|\}\}/g, '')))];
  }
}
