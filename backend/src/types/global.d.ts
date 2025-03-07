// Tipos globais para módulos que não têm declarações de tipos
declare module 'express-sitemap-xml' {
    import { RequestHandler } from 'express';

    interface SitemapURLOptions {
        url: string;
        changefreq?: string;
        priority?: number;
        lastmod?: Date;
    }

    export function sitemapXML(
        getUrls: () => Promise<SitemapURLOptions[] | string[]>
    ): RequestHandler;

    export function sitemapTxt(
        getUrls: () => Promise<SitemapURLOptions[] | string[]>
    ): RequestHandler;
}

declare module 'prerender-node' {
    import { RequestHandler } from 'express';

    interface PrerenderOptions {
        set(key: string, value: unknown): PrerenderOptions;
        beforeRender(callback: (req: Record<string, unknown>, done: () => void) => void): PrerenderOptions;
        afterRender(callback: (err: Error | null, req: Record<string, unknown>, prerender_res: Record<string, unknown>) => void): PrerenderOptions;
    }

    const prerender: RequestHandler & PrerenderOptions;
    export = prerender;
}

// Melhorar tipagem das variáveis de ambiente
declare namespace NodeJS {
    interface ProcessEnv {
        PORT?: string;
        NODE_ENV?: 'development' | 'production' | 'test';
        ADMIN_API_KEY?: string;
        LOG_LEVEL?: string;
        HOST_URL?: string;
        FRONTEND_URL?: string;
        RATE_LIMIT_WINDOW_MS?: string;
        RATE_LIMIT_MAX?: string;
        CORS_ORIGINS?: string;
        PRERENDER_TOKEN?: string;
        SITE_DOMAIN?: string;
        SITE_NAME?: string;
        DEFAULT_LANG?: string;
        ALTERNATE_LANGS?: string;
        GOOGLE_ANALYTICS_ID?: string;
        GTM_ID?: string;
        USE_IN_MEMORY_STORE?: string;
        CACHE_TTL?: string;
        UTM_CAMPAIGN_SOURCES?: string;
        MARKETING_AUTO_TAG_LINKS?: string;
    }
}

// Extensões para Request do Express
declare namespace Express {
    interface Request {
        visitorId?: string;
        startTime?: number;
        trackingSource?: string;
        trackingMedium?: string;
        trackingCampaign?: string;
        language?: string;
    }
}

// Declaração para módulos sem tipos
declare module '*.json' {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value: any;
    export default value;
} 