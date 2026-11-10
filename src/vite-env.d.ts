/// <reference types="vite/client" />

/** GoatCounter analytics global injected by the count.js script (index.html). */
interface Window {
  goatcounter?: {
    count: (vars: { path: string; title?: string; referrer?: string; event?: boolean }) => void;
  };
}
