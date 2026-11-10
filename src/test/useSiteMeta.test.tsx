import { render, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { metaCopy } from "@/data/meta";
import { useSiteMeta } from "@/hooks/useSiteMeta";

vi.mock("@/hooks/useSiteContent", () => ({
  useSiteContent: () => ({ meta: metaCopy }),
}));

const Head = () => {
  useSiteMeta();
  return null;
};

const open = (path: string) => render(
  <MemoryRouter initialEntries={[path]}><Head /></MemoryRouter>,
);

afterEach(() => {
  cleanup();
  document.head.innerHTML = "";
});

describe("route indexing", () => {
  it("gives /about its own canonical URL", () => {
    open("/about");
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute("href"))
      .toBe("https://bitcoinvibe.camp/about");
  });

  it("keeps the homepage canonical at the root", () => {
    open("/");
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute("href"))
      .toBe("https://bitcoinvibe.camp/");
  });

  it.each(["/login", "/.lovable/oauth/consent"])("excludes %s from indexing", (path) => {
    open(path);
    expect(document.querySelector('meta[name="robots"]')?.getAttribute("content"))
      .toBe("noindex");
  });

  it("clears noindex when returning to a public page", () => {
    const privatePage = open("/login");
    privatePage.unmount();
    open("/about");
    expect(document.querySelector('meta[name="robots"]')).toBeNull();
  });
});