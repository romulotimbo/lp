import { renderToString } from "react-dom/server";
import { StrictMode } from "react";
import App from "@/App";
import { setSsrPathname } from "@/lib/pathname";

export function renderReviewSkeptic(url: string): string {
  setSsrPathname(url);
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
