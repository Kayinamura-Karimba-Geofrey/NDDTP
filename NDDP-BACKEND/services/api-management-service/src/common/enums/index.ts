export enum ApiProtocol {
  REST = 'REST',
  GRAPHQL = 'GRAPHQL',
  GRPC = 'GRPC',
}

export enum ProductStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DEPRECATED = 'DEPRECATED',
}

export enum RouteStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  ANY = 'ANY',
}

export enum ConsumerStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
}

export enum ApiKeyStatus {
  ACTIVE = 'ACTIVE',
  REVOKED = 'REVOKED',
}

export enum ApiManagementPublishedEvent {
  PRODUCT_CREATED = 'apimanagement.product.created',
  ROUTE_CREATED = 'apimanagement.route.created',
  CONSUMER_CREATED = 'apimanagement.consumer.created',
  KEY_ISSUED = 'apimanagement.key.issued',
  KEY_REVOKED = 'apimanagement.key.revoked',
}
