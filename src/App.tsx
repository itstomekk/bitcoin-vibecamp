import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SiteContentProvider } from "@/hooks/useSiteContent";
import { useSiteMeta } from "@/hooks/useSiteMeta";
import Index from "./pages/Index.tsx";
import About from "./pages/About.tsx";
import NotFound from "./pages/NotFound.tsx";


const queryClient = new QueryClient();

/**
 * Applies the editable `site.meta` head metadata once the content has loaded.
 * Renders nothing — the static tags in index.html stay as the crawler fallback.
 */
const HeadMeta = () => {
  useSiteMeta();
  return null;
};

/** Routes that should never show up in analytics (crew/admin surfaces). */
const NON_COUNTED_PREFIXES = ["/login", "/.lovable"];

/**
 * GoatCounter page-view tracking for a SPA.
 * The count.js script (loaded in index.html) exposes window.goatcounter;
 * since it loads async, we retry briefly before giving up on a navigation.
 */
const GoatCounterTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (NON_COUNTED_PREFIXES.some((p) => location.pathname.startsWith(p))) return;

    const path = location.pathname + location.search;
    let attempts = 0;
    const tryCount = () => {
      // Typed via the Window augmentation in src/vite-env.d.ts
      const goat = window.goatcounter;
      if (goat) {
        goat.count({ path });
      } else if (attempts++ < 10) {
        setTimeout(tryCount, 500);
      }
    };
    tryCount();
  }, [location.pathname, location.search]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* One fetch of the site_content table, shared by every section */}
        <SiteContentProvider>
          <HeadMeta />
          <GoatCounterTracker />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}

            <Route path="*" element={<NotFound />} />

          </Routes>
        </SiteContentProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
