/** Service registry — mirrors NDDP-FRONTEND/src/constants/services.ts */
export declare const MICROSERVICES: {
    readonly auth: {
        readonly port: 3001;
        readonly label: "Authentication";
    };
    readonly authorization: {
        readonly port: 3002;
        readonly label: "Authorization";
    };
    readonly user: {
        readonly port: 3003;
        readonly label: "User Management";
    };
    readonly notification: {
        readonly port: 3004;
        readonly label: "Notifications";
    };
    readonly audit: {
        readonly port: 3005;
        readonly label: "Audit Logs";
    };
    readonly personnel: {
        readonly port: 3006;
        readonly label: "Personnel";
    };
    readonly recruitment: {
        readonly port: 3007;
        readonly label: "Recruitment";
    };
    readonly leave: {
        readonly port: 3008;
        readonly label: "Leave";
    };
    readonly welfare: {
        readonly port: 3009;
        readonly label: "Welfare";
    };
    readonly medical: {
        readonly port: 3010;
        readonly label: "Medical";
    };
    readonly training: {
        readonly port: 3011;
        readonly label: "Training";
    };
    readonly performance: {
        readonly port: 3012;
        readonly label: "Performance";
    };
    readonly asset: {
        readonly port: 3013;
        readonly label: "Assets";
    };
    readonly inventory: {
        readonly port: 3014;
        readonly label: "Inventory";
    };
    readonly logistics: {
        readonly port: 3015;
        readonly label: "Logistics";
    };
    readonly procurement: {
        readonly port: 3016;
        readonly label: "Procurement";
    };
    readonly fleet: {
        readonly port: 3017;
        readonly label: "Fleet";
    };
    readonly maintenance: {
        readonly port: 3018;
        readonly label: "Maintenance";
    };
    readonly facilities: {
        readonly port: 3019;
        readonly label: "Facilities";
    };
    readonly finance: {
        readonly port: 3020;
        readonly label: "Finance";
    };
    readonly visitor: {
        readonly port: 3021;
        readonly label: "Visitors";
    };
    readonly workflow: {
        readonly port: 3022;
        readonly label: "Workflow";
    };
    readonly calendar: {
        readonly port: 3023;
        readonly label: "Calendar";
    };
    readonly reporting: {
        readonly port: 3024;
        readonly label: "Reporting";
    };
    readonly analytics: {
        readonly port: 3025;
        readonly label: "Analytics";
    };
    readonly 'business-intelligence': {
        readonly port: 3026;
        readonly label: "Business Intelligence";
    };
    readonly messaging: {
        readonly port: 3027;
        readonly label: "Messaging";
    };
    readonly announcement: {
        readonly port: 3028;
        readonly label: "Announcements";
    };
    readonly search: {
        readonly port: 3029;
        readonly label: "Search";
    };
    readonly configuration: {
        readonly port: 3030;
        readonly label: "Configuration";
    };
    readonly integration: {
        readonly port: 3031;
        readonly label: "Integration";
    };
    readonly 'api-management': {
        readonly port: 3032;
        readonly label: "API Management";
    };
    readonly backup: {
        readonly port: 3033;
        readonly label: "Backup";
    };
    readonly monitoring: {
        readonly port: 3034;
        readonly label: "Monitoring";
    };
    readonly 'ai-assistant': {
        readonly port: 3035;
        readonly label: "AI Assistant";
    };
};
export type ServiceKey = keyof typeof MICROSERVICES;
export declare function resolveService(key: string): {
    key: ServiceKey;
    port: number;
    host: string;
} | null;
export declare function upstreamBaseUrl(key: ServiceKey): string;
