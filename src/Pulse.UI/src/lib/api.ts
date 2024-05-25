import type { Liveness, UIApiSettings, WebHook } from "@/types/api";

export async function fetchHealthchecks(): Promise<Liveness[]> {
  const response = await fetch(`/${window.uiEndpoint}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
}

export async function fetchWebhooks(): Promise<WebHook[]> {
  const response = await fetch(`/${window.webhookEndpoint}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
}

export async function fetchSettings(): Promise<UIApiSettings> {
  const response = await fetch(`/${window.uiSettingsEndpoint}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
}
