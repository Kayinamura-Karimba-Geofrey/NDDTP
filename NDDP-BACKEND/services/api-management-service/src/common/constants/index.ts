export const CACHE_KEYS = {
  PRODUCT: (id: string) => `apimanagement:product:${id}`,
  PRODUCTS: 'apimanagement:products:active',
  ROUTE: (id: string) => `apimanagement:route:${id}`,
  PRODUCT_ROUTES: (productId: string) => `apimanagement:product:${productId}:routes`,
  CONSUMER: (id: string) => `apimanagement:consumer:${id}`,
  CONSUMERS: 'apimanagement:consumers:active',
} as const;

export const RABBITMQ_ROUTING_KEYS = {
  PRODUCT_CREATED: 'apimanagement.product.created',
  ROUTE_CREATED: 'apimanagement.route.created',
  CONSUMER_CREATED: 'apimanagement.consumer.created',
  KEY_ISSUED: 'apimanagement.key.issued',
  KEY_REVOKED: 'apimanagement.key.revoked',
} as const;

export const API_KEY_STATUS_TRANSITIONS: Record<string, string[]> = {
  ACTIVE: ['REVOKED'],
  REVOKED: [],
};

export const DEFAULT_API_PRODUCTS = [
  { code: 'API-PERSONNEL', name: 'Personnel API', version: 'v1', basePath: '/api/v1/personnel', protocol: 'REST' },
  { code: 'API-FINANCE', name: 'Finance API', version: 'v1', basePath: '/api/v1/finance', protocol: 'REST' },
  { code: 'API-LOGISTICS', name: 'Logistics API', version: 'v1', basePath: '/api/v1/logistics', protocol: 'REST' },
] as const;
