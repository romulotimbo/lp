import type { TrackingTag } from "./src/product/types";

// `<noscript><img>` não é um filho válido de `<noscript>` dentro de `<head>`
// (o parser HTML rejeita) — o `<script>` de cada tag vai no `<head>` e o
// fallback `<noscript>` correspondente vai no `<body>`.
export function trackingTagHeadHtml(tag: TrackingTag): string {
  if (tag.type === "meta_pixel") {
    return `
    <!-- Meta Pixel (${tag.id}) -->
    <script>
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${tag.id}');
      fbq('track', 'PageView');
    </script>`;
  }

  if (tag.type === "google_ads") {
    return `
    <!-- Google Ads (${tag.id}) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${tag.id}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${tag.id}');
    </script>`;
  }

  return "";
}

export function trackingTagNoscriptHtml(tag: TrackingTag): string {
  if (tag.type === "meta_pixel") {
    return `
    <noscript>
      <img height="1" width="1" style="display:none" alt=""
        src="https://www.facebook.com/tr?id=${tag.id}&ev=PageView&noscript=1" />
    </noscript>`;
  }
  return "";
}
