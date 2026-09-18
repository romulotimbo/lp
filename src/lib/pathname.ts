import { product } from "@/product/active";

let ssrPathname = "/";

export function setSsrPathname(pathname: string) {
  ssrPathname = normalizePathname(pathname);
}

/** Prefix público da Instância (`""` quando a página vive na raiz do Host). */
export function publicBasePath(): string {
  const raw = product.basePath?.trim();
  if (!raw || raw === "/") return "";
  return raw.replace(/\/+$/, "");
}

/** Href interno que respeita `basePath` (home, páginas legais). */
export function siteHref(path: string): string {
  const base = publicBasePath();
  if (!path || path === "/") return base || "/";
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${base}${clean}`;
}

export function getPathname(): string {
  if (typeof window !== "undefined") {
    return stripPublicBase(normalizePathname(window.location.pathname));
  }
  return ssrPathname;
}

export function normalizePathname(pathname: string): string {
  if (!pathname || pathname === "/") return "/";
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed || "/";
}

function stripPublicBase(pathname: string): string {
  const base = publicBasePath();
  if (!base) return pathname;
  if (pathname === base) return "/";
  if (pathname.startsWith(`${base}/`)) {
    return normalizePathname(pathname.slice(base.length));
  }
  return pathname;
}
