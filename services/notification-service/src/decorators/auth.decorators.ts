import { SetMetadata } from '@nestjs/common';
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
export const PERMISSIONS_KEY = 'permissions';
export const RequirePermissions = (...p: string[]) => SetMetadata(PERMISSIONS_KEY, p);
