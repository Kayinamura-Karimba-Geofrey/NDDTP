export declare const MICROSERVICES: Record<string, {
    port: number;
    label: string;
}>;
export type ServiceKey = keyof typeof MICROSERVICES;
export declare function resolveService(key: string): {
    key: ServiceKey;
    port: number;
    host: string;
} | null;
export declare function upstreamBaseUrl(key: ServiceKey): string;
