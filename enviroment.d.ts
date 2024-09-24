declare global {
    namespace NodeJS {
        interface ProcessEnv {
            CONVEX_DEPLOYMENT: string;
            NODE_ENV: 'development' | 'production';
            NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
            CLERK_SECRET_KEY: string;
            NEXT_PUBLIC_CONVEX_URL: string;
            NEXT_PUBLIC_CONVEX_DOMAIN: string;
            EDGE_STORE_ACCESS_KEY: string;
            EDGE_STORE_SECRET_KEY: string;
        }
    }
}

export {};
