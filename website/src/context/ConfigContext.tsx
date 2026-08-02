"use client";

import { createContext, useContext, useState, useEffect } from "react";

export type SiteConfig = {
  name: string;
  tagline: string;
  est: number;
  address: string;
  phone: string;
  email: string;
  minOrder: number;
  deliveryCharge: number;
  freeDeliveryThreshold: number;
  hours: { day: string; time: string; isOpen: boolean }[];
  deliveryEstimateMinutes: number;
  collectionEstimateMinutes: number;
  loyaltyPointsPerPound: number;
  maxPartySize: number;
  orderRecentHours: number;
  orderCancelWindowMinutes: number;
  passwordMinLength: number;
  contactAddressNote: string;
  contactEmailNote: string;
  contactPhoneNote: string;
  mapsEmbedUrl: string;
  mapsLinkUrl: string;
  contactIntroText: string;
  giftVoucherPresets: number[];
};

const DEFAULT_CONFIG: SiteConfig = {
  name: "Abhiruchi",
  tagline: "Authentic South Indian Cuisine in the Heart of Sheffield",
  est: 2000,
  address: "15 Castle Street, Sheffield, S3 8LT",
  phone: "+44 114 267 8899",
  email: "hello@abhiruchi.co.uk",
  minOrder: 15,
  deliveryCharge: 2.99,
  freeDeliveryThreshold: 35,
  hours: [
    { day: "Mon – Thu", time: "12:00pm – 10:00pm", isOpen: true },
    { day: "Fri – Sat", time: "12:00pm – 11:00pm", isOpen: true },
    { day: "Sunday",    time: "12:00pm – 9:30pm",  isOpen: true },
  ],
  deliveryEstimateMinutes: 35,
  collectionEstimateMinutes: 20,
  loyaltyPointsPerPound: 100,
  maxPartySize: 10,
  orderRecentHours: 3,
  orderCancelWindowMinutes: 15,
  passwordMinLength: 8,
  contactAddressNote: "Bus 65 stops outside · 2 mins walk from Sheffield Botanical Gardens",
  contactEmailNote: "Replies within 4 hours",
  contactPhoneNote: "Lines open through service hours",
  mapsEmbedUrl: "https://www.google.com/maps?q=15+Castle+Street,+Sheffield,+S3+8LT&output=embed",
  mapsLinkUrl: "https://maps.google.com/?q=15+Castle+Street+Sheffield+S3+8LT",
  contactIntroText: "Walk-ins welcome. Reservations recommended for Friday and Saturday evenings.",
  giftVoucherPresets: [10, 20, 25, 50, 100],
};

const ConfigContext = createContext<SiteConfig>(DEFAULT_CONFIG);

export function useConfig(): SiteConfig {
  return useContext(ConfigContext);
}

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_CONFIG);

  useEffect(() => {
    fetch("/api/config")
      .then((r) => r.ok ? r.json() : null)
      .then((data: SiteConfig | null) => {
        if (data) setConfig(data);
      })
      .catch(() => {});
  }, []);

  return (
    <ConfigContext.Provider value={config}>
      {children}
    </ConfigContext.Provider>
  );
}
