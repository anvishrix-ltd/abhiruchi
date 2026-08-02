// Browser-print receipt generator.
// Opens a print-optimised window sized for an 80mm thermal roll and triggers
// the native print dialog — works with any printer the machine has installed
// (thermal, inkjet, or "Save as PDF"), no hardware driver integration needed.
//
// Run the till in Chrome with --kiosk-printing and the thermal printer set as
// the system default to skip the dialog and print on one tap.

export interface ReceiptItem { name: string; qty: number; price: number; }

export interface ReceiptData {
  orderId: string;
  orderType: string;
  paymentMethod: string;
  items: ReceiptItem[];
  subtotal: number;
  discount: number;
  total: number;
  table?: string;
  customerName?: string;
  placedAt: string; // ISO
}

export interface RestaurantDetails {
  name: string;
  tagline: string;
  address: string;
  phone: string;
  vatNumber: string;
  vatRate: number;   // percent; 0 hides the VAT line entirely
  footer: string;
}

// Used only if the settings request fails — keep in step with the Settings page.
const FALLBACK: RestaurantDetails = {
  name: "Abhiruchulu",
  tagline: "Authentic South Indian Cuisine in the Heart of Sheffield",
  address: "15 Castle Street, Sheffield, S3 8LT",
  phone: "0114 453 7431",
  vatNumber: "",
  vatRate: 0,
  footer: "Thank you for your order!",
};

let _cache: RestaurantDetails | null = null;
let _inflight: Promise<RestaurantDetails> | null = null;

/** Loads the details the receipt header prints, once per page load. */
export function getRestaurantDetails(): Promise<RestaurantDetails> {
  if (_cache) return Promise.resolve(_cache);
  if (_inflight) return _inflight;

  _inflight = fetch("/api/admin/settings")
    .then(r => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
    .then((s: Record<string, string>) => {
      const rate = parseFloat(s.vatRate ?? "");
      _cache = {
        name: s.name?.trim() || FALLBACK.name,
        tagline: s.tagline?.trim() || "",
        address: s.address?.trim() || FALLBACK.address,
        phone: s.phone?.trim() || FALLBACK.phone,
        vatNumber: s.vatNumber?.trim() || "",
        vatRate: Number.isFinite(rate) && rate > 0 ? rate : 0,
        footer: s.receiptFooter?.trim() || FALLBACK.footer,
      };
      return _cache;
    })
    .catch(() => FALLBACK)
    .finally(() => { _inflight = null; });

  return _inflight;
}

/** Warm the cache on page mount so printing never waits on the network. */
export function prefetchRestaurantDetails(): void {
  void getRestaurantDetails();
}

function esc(s: string) {
  return s.replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c] as string));
}

export function receiptHtml(data: ReceiptData, r: RestaurantDetails = FALLBACK): string {
  const d = new Date(data.placedAt);
  const when = d.toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
  const rows = data.items.map(i => `
    <tr>
      <td class="qty">${i.qty}×</td>
      <td class="nm">${esc(i.name)}</td>
      <td class="amt">£${(i.price * i.qty).toFixed(2)}</td>
    </tr>`).join("");

  // UK restaurant prices are VAT-inclusive, so VAT is shown for information only
  // and is never added to the total.
  const vat = r.vatRate > 0 ? data.total - data.total / (1 + r.vatRate / 100) : 0;

  return `<!doctype html><html><head><meta charset="utf-8"><title>Receipt ${esc(data.orderId)}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: "Courier New", monospace; color: #000; background: #fff; padding: 8px; }
    .r { width: 280px; margin: 0 auto; }
    .center { text-align: center; }
    .name { font-size: 18px; font-weight: 700; letter-spacing: 1px; }
    .sub { font-size: 10px; margin: 2px 0; }
    .meta { font-size: 11px; margin: 8px 0; }
    .meta div { display: flex; justify-content: space-between; }
    hr { border: none; border-top: 1px dashed #000; margin: 8px 0; }
    table { width: 100%; font-size: 12px; border-collapse: collapse; }
    td { padding: 2px 0; vertical-align: top; }
    .qty { width: 28px; }
    .amt { text-align: right; white-space: nowrap; }
    .tot { font-size: 13px; }
    .tot div { display: flex; justify-content: space-between; padding: 1px 0; }
    .grand { font-size: 16px; font-weight: 700; border-top: 1px solid #000; margin-top: 4px; padding-top: 4px; }
    .vat { font-size: 10px; margin-top: 3px; }
    .foot { font-size: 10px; margin-top: 10px; text-align: center; }
    @media print { @page { margin: 0; } body { padding: 0; } }
  </style></head><body>
  <div class="r">
    <div class="center">
      <div class="name">${esc(r.name)}</div>
      ${r.tagline ? `<div class="sub">${esc(r.tagline)}</div>` : ""}
      <div class="sub">${esc(r.address)}</div>
      <div class="sub">Tel: ${esc(r.phone)}</div>
      ${r.vatNumber ? `<div class="sub">VAT Reg No: ${esc(r.vatNumber)}</div>` : ""}
    </div>
    <hr>
    <div class="meta">
      <div><span>Order:</span><span>${esc(data.orderId)}</span></div>
      <div><span>Type:</span><span>${esc(data.orderType)}</span></div>
      ${data.table ? `<div><span>Table:</span><span>${esc(data.table)}</span></div>` : ""}
      ${data.customerName ? `<div><span>Customer:</span><span>${esc(data.customerName)}</span></div>` : ""}
      <div><span>Date:</span><span>${esc(when)}</span></div>
    </div>
    <hr>
    <table><tbody>${rows}</tbody></table>
    <hr>
    <div class="tot">
      <div><span>Subtotal</span><span>£${data.subtotal.toFixed(2)}</span></div>
      ${data.discount > 0 ? `<div><span>Discount</span><span>-£${data.discount.toFixed(2)}</span></div>` : ""}
      <div class="grand"><span>TOTAL</span><span>£${data.total.toFixed(2)}</span></div>
      <div style="margin-top:4px"><span>Paid via</span><span style="text-transform:capitalize">${esc(data.paymentMethod)}</span></div>
      ${vat > 0 ? `<div class="vat"><span>Includes VAT @ ${r.vatRate}%</span><span>£${vat.toFixed(2)}</span></div>` : ""}
    </div>
    <hr>
    <div class="foot">
      ${esc(r.footer)}<br>
      ${esc(r.name)} · See you again soon
    </div>
  </div>
  </body></html>`;
}

/**
 * Prints a standalone HTML document via a hidden iframe.
 *
 * An iframe rather than window.open() because pop-ups are blocked outside a
 * user gesture, which auto-print (fired from order polling) has no way to
 * provide. Only the iframe's content reaches the printer, not the admin page.
 */
export function printHtml(html: string): Promise<void> {
  return new Promise((resolve) => {
    const iframe = document.createElement("iframe");
    iframe.setAttribute("aria-hidden", "true");
    iframe.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden";

    let printed = false;
    iframe.onload = () => {
      if (printed) return;   // srcdoc fires once, but never print twice
      printed = true;
      try {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
      } catch {}
      // Held open past print() so the job is spooled before the document goes away
      setTimeout(() => iframe.remove(), 3000);
      resolve();
    };

    // srcdoc set before insertion, so the single load event carries the receipt.
    // Appending first and then document.write() races: the empty about:blank
    // frame fires load on its own and prints a blank page (Safari reliably did).
    iframe.srcdoc = html;
    document.body.appendChild(iframe);
  });
}

export async function printReceipt(data: ReceiptData): Promise<void> {
  const details = await getRestaurantDetails();
  await printHtml(receiptHtml(data, details));
}
