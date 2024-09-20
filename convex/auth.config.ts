import {env} from "../env";

const authConfig = {
    providers: [
        {
            domain: env.NEXT_PUBLIC_CONVEX_DOMAIN,
            applicationID: 'convex',
        },
    ],
};

export default authConfig;
