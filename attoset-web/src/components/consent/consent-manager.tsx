"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cookieConsent } from "@/lib/content";

// Analytics is opt-in: nothing below loads until the visitor accepts.
const GA_MEASUREMENT_ID = "G-T0PD24CB3T";
const APOLLO_APP_ID = "6aad4f7d246b4a0014b6045d";

const STORAGE_KEY = "attoset-consent-v1";
export const OPEN_SETTINGS_EVENT = "attoset:cookie-settings";

type Choice = "granted" | "denied";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    trackingFunctions?: { onLoad: (opts: { appId: string }) => void };
  }
  interface Navigator {
    globalPrivacyControl?: boolean;
  }
}

function readChoice(): Choice | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

function saveChoice(choice: Choice) {
  try {
    localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // Private mode / blocked storage: the choice holds for this page view only.
  }
}

function addScript(src: string, onload?: () => void) {
  const s = document.createElement("script");
  s.src = src;
  s.async = true;
  if (onload) s.onload = onload;
  document.head.appendChild(s);
}

let trackersLoaded = false;

function loadTrackers() {
  if (trackersLoaded) return;
  trackersLoaded = true;

  // Google Analytics 4 with Consent Mode v2: analytics on, ads signals off.
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js expects the raw `arguments` object, not an array.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID);
  addScript(`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`);

  // Apollo.io website visitor tracking.
  addScript(
    `https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache=${Math.random().toString(36).substring(7)}`,
    () => window.trackingFunctions?.onLoad({ appId: APOLLO_APP_ID }),
  );
}

// Withdrawing consent: drop GA's first-party cookies on every domain level.
function clearAnalyticsCookies() {
  const host = location.hostname;
  const domains = ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  for (const raw of document.cookie.split(";")) {
    const name = raw.split("=")[0].trim();
    if (!name.startsWith("_ga")) continue;
    for (const d of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ""}`;
    }
  }
}

export function ConsentManager() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const choice = readChoice();
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (choice === "granted") loadTrackers();
    // A Global Privacy Control signal counts as "reject" until the visitor
    // says otherwise through Cookie settings. The banner waits a beat so it
    // never competes with the hero for first paint.
    else if (choice === null && !navigator.globalPrivacyControl)
      timer = setTimeout(() => setOpen(true), 600);

    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_SETTINGS_EVENT, reopen);
    return () => {
      clearTimeout(timer);
      window.removeEventListener(OPEN_SETTINGS_EVENT, reopen);
    };
  }, []);

  const decide = (choice: Choice) => {
    saveChoice(choice);
    setOpen(false);
    if (choice === "granted") {
      loadTrackers();
    } else if (trackersLoaded) {
      // Scripts can't be unloaded once running, so reload without them.
      window.gtag?.("consent", "update", { analytics_storage: "denied" });
      clearAnalyticsCookies();
      location.reload();
    }
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={cookieConsent.title}
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-md rounded-2xl border border-line bg-white p-5 shadow-[0_12px_40px_rgba(0,0,0,0.12)] sm:left-6 sm:right-auto sm:mx-0"
    >
      <p className="font-display text-[15px] font-semibold text-ink">
        {cookieConsent.title}
      </p>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">
        {cookieConsent.body}{" "}
        <Link
          href={cookieConsent.policyHref}
          className="font-medium text-ink underline underline-offset-4 hover:text-orange"
        >
          {cookieConsent.policyLabel}
        </Link>
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Button variant="secondary" size="sm" onClick={() => decide("denied")}>
          {cookieConsent.reject}
        </Button>
        <Button variant="primary" size="sm" onClick={() => decide("granted")}>
          {cookieConsent.accept}
        </Button>
      </div>
    </div>
  );
}

export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))}
      className={className}
    >
      {cookieConsent.settingsLabel}
    </button>
  );
}
