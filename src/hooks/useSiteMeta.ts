import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSiteContent } from "@/hooks/useSiteContent";

/**
 * useSiteMeta — applies the `site.meta` block to document.head at runtime.
 *
 * The static tags in index.html are left untouched and remain the fallback for
 * crawlers that don't run JavaScript; this hook only updates them in place (no
 * duplicate tags are ever added). Route-specific tags are owned here so page
 * effects and asynchronous CMS updates cannot overwrite one another.
 */

const setMeta = (attr: "name" | "property", key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const setLink = (rel: string, href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

/** Replaces the nth existing JSON-LD block, rather than appending a duplicate. */
const setJsonLd = (index: number, data: Record<string, unknown>) => {
  const blocks = document.head.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]');
  const el = blocks[index];
  if (el) el.textContent = JSON.stringify(data);
};

export const useSiteMeta = () => {
  const { meta } = useSiteContent();
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const isAbout = pathname === "/about";
  const noindex = pathname === "/login" || pathname === "/.lovable/oauth/consent";
  const pageUrl = `https://bitcoinvibe.camp${pathname}`;
  const title = isAbout
    ? "About Bitcoin Vibecamp | Builder Bootcamp in Próspera"
    : meta.title;
  const description = isAbout
    ? "Learn what vibecoding is, the AI-assisted building skills taught at Bitcoin Vibecamp, and the workshop programme in Próspera, Roatán."
    : meta.description;

  useEffect(() => {
    document.title = title;
    setMeta("name", "description", description);
    if (noindex) {
      setMeta("name", "robots", "noindex");
    } else {
      document.head.querySelectorAll('meta[name="robots"]').forEach((el) => el.remove());
    }

    setMeta("name", "keywords", meta.keywords);
    setMeta("name", "author", meta.author);
    setMeta("name", "theme-color", meta.themeColor);
    setLink("canonical", pageUrl);

    setMeta("property", "og:type", meta.ogType);
    setMeta("property", "og:url", pageUrl);
    setMeta("property", "og:title", isHome ? meta.ogTitle : title);
    setMeta("property", "og:description", isHome ? meta.ogDescription : description);
    setMeta("property", "og:site_name", meta.ogSiteName);
    setMeta("property", "og:image", meta.ogImage);
    setMeta("property", "og:image:secure_url", meta.ogImage);
    setMeta("property", "og:image:alt", meta.ogImageAlt);

    setMeta("name", "twitter:card", meta.twitterCard);
    setMeta("name", "twitter:title", meta.twitterTitle);
    setMeta("name", "twitter:description", meta.twitterDescription);
    setMeta("name", "twitter:image", meta.twitterImage);
    setMeta("name", "twitter:image:alt", meta.twitterImageAlt);

    setJsonLd(0, meta.eventJsonLd);
    setJsonLd(1, meta.faqJsonLd);
  }, [meta, isHome, title, description, pageUrl, noindex]);
};
