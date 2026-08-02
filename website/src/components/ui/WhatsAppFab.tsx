"use client";

import { useConfig } from "@/context/ConfigContext";
import { WhatsAppIcon } from "@/components/ui/Icons";

/**
 * Floating WhatsApp button, bottom-right on every page.
 *
 * Renders nothing until a number is configured, so the corner stays clear for
 * anyone who has not set one. Sits below the cookie banner (z-index 9999) and
 * above the mobile bottom nav (60), and is lifted clear of that nav on small
 * screens by the .wa-fab rule in globals.css.
 */
export function WhatsAppFab() {
  const config = useConfig();
  const number = (config.whatsapp ?? "").replace(/\D/g, "").replace(/^0/, "44");
  if (!number) return null;

  return (
    <a
      href={`https://wa.me/${number}`}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-fab"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <WhatsAppIcon width={28} height={28} />
    </a>
  );
}
