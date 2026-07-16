import { Test, TestingModule } from '@nestjs/testing';
import { TemplateRendererService } from '../../src/modules/delivery/template-renderer.service';
import { TemplateRenderException } from '../../src/common/exceptions/notification.exceptions';

describe('TemplateRendererService', () => {
  let service: TemplateRendererService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TemplateRendererService],
    }).compile();
    service = module.get(TemplateRendererService);
  });

  it('should render template with variables', () => {
    const result = service.render('Hello {{firstName}} {{lastName}}!', {
      firstName: 'John', lastName: 'Doe',
    });
    expect(result).toBe('Hello John Doe!');
  });

  it('should throw on missing variable', () => {
    expect(() => service.render('Hello {{name}}!', {})).toThrow(TemplateRenderException);
  });

  it('should extract variables from template', () => {
    const vars = service.extractVariables('Hello {{firstName}}, reset: {{resetLink}}');
    expect(vars).toEqual(['firstName', 'resetLink']);
  });
});
