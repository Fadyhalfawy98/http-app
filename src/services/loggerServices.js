import * as Sentry from "@sentry/react";
import {Integrations} from "@sentry/tracing";

function init() {
    Sentry.init({
        dsn: "https://70de9af3f59d4beaa7ad79edc81aab61@o1097021.ingest.sentry.io/6118167",
        integrations: [new Integrations.BrowserTracing()],

        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,
    });
};

function log (error) {
    Sentry.captureException(error);
};

export default {
    init,
    log
};