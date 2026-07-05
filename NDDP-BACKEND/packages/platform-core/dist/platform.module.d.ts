import { DynamicModule } from '@nestjs/common';
export interface PlatformModuleOptions {
    serviceName: string;
}
export declare class PlatformModule {
    static forRoot(options: PlatformModuleOptions): DynamicModule;
}
