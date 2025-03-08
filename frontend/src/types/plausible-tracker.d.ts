declare module 'plausible-tracker' {
    interface PlausibleOptions {
        domain?: string;
        apiHost?: string;
        trackLocalhost?: boolean;
    }

    interface EventOptions {
        callback?: () => void;
        props?: Record<string, string | number | boolean>;
    }

    interface PlausibleInstance {
        trackPageview: (options?: EventOptions) => void;
        trackEvent: (eventName: string, options?: EventOptions) => void;
        enableAutoPageviews: () => void;
        enableAutoOutboundTracking: () => void;
    }

    export default function Plausible(options?: PlausibleOptions): PlausibleInstance;
} 