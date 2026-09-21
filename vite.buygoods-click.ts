/**
 * Script de head da Instância. Grava gclid/gbraid/wbraid da visita e, no
 * clique, anexa nos subids do hop BuyGoods. Não dispara conversion.
 */
export function buygoodsClickForwardingScript(offerHost: string): string {
  const host = JSON.stringify(offerHost.trim().toLowerCase());
  return `
    <script>
      (function () {
        var HOST = ${host};
        var KEY = "bg_click_ids";
        var MAX_AGE = 7776000;
        function valid(id) {
          return typeof id === "string" && /^[A-Za-z0-9._~-]{8,300}$/.test(id);
        }
        function readParams() {
          var q = new URLSearchParams(location.search);
          return {
            gclid: q.get("gclid") || "",
            gbraid: q.get("gbraid") || "",
            wbraid: q.get("wbraid") || ""
          };
        }
        function readStored() {
          var raw = "";
          try { raw = localStorage.getItem(KEY) || ""; } catch (e) {}
          if (!raw) {
            var match = document.cookie.match(/(?:^|; )bg_click_ids=([^;]*)/);
            if (match) {
              try { raw = decodeURIComponent(match[1]); } catch (e) { raw = ""; }
            }
          }
          try {
            var parsed = JSON.parse(raw);
            return {
              gclid: parsed.gclid || "",
              gbraid: parsed.gbraid || "",
              wbraid: parsed.wbraid || ""
            };
          } catch (e) {
            return { gclid: "", gbraid: "", wbraid: "" };
          }
        }
        function persist(ids) {
          var raw = JSON.stringify(ids);
          try { localStorage.setItem(KEY, raw); } catch (e) {}
          document.cookie = KEY + "=" + encodeURIComponent(raw) + "; Path=/; Max-Age=" + MAX_AGE + "; SameSite=Lax";
        }
        function pick(fromUrl, stored) {
          return valid(fromUrl) ? fromUrl : (valid(stored) ? stored : "");
        }
        var fromUrl = readParams();
        var stored = readStored();
        var ids = {
          gclid: pick(fromUrl.gclid, stored.gclid),
          gbraid: pick(fromUrl.gbraid, stored.gbraid),
          wbraid: pick(fromUrl.wbraid, stored.wbraid)
        };
        if (valid(fromUrl.gclid) || valid(fromUrl.gbraid) || valid(fromUrl.wbraid)) persist(ids);
        function decorate(anchor) {
          if (!anchor || (!ids.gclid && !ids.gbraid && !ids.wbraid)) return;
          var href = anchor.getAttribute("href") || "";
          var url;
          try { url = new URL(href, location.href); } catch (e) { return; }
          if (url.hostname !== HOST && url.hostname !== "www." + HOST) return;
          if (ids.gclid) url.searchParams.set("subid", ids.gclid);
          if (ids.gbraid) url.searchParams.set("subid2", ids.gbraid);
          if (ids.wbraid) url.searchParams.set("subid3", ids.wbraid);
          anchor.setAttribute("href", url.toString());
        }
        function fromEvent(event) {
          var target = event.target;
          if (!target || !target.closest) return;
          decorate(target.closest("a"));
        }
        document.addEventListener("pointerdown", fromEvent, true);
        document.addEventListener("click", fromEvent, true);
      })();
    </script>`;
}
