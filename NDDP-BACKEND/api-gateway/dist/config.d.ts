import 'dotenv/config';
export declare const config: {
    readonly port: number;
    readonly host: string;
    readonly apiPrefix: string;
    readonly servicePrefix: string;
    readonly corsOrigins: string[];
    readonly requestTimeoutMs: number;
    readonly logLevel: string;
};
