declare global {
  interface Window {
    Connect?: new (options: DojahConnectOptions) => DojahConnectInstance;
  }
}

export type DojahWidgetConfig = {
  enabled: boolean;
  appId: string;
  publicKey: string;
  widgetId: string;
};

export type DojahConnectOptions = {
  app_id: string;
  p_key: string;
  type: "custom" | "liveness" | string;
  reference_id: string;
  config: { widget_id: string };
  metadata?: Record<string, string>;
  user_data?: {
    first_name?: string;
    last_name?: string;
    dob?: string;
    email?: string;
    residence_country?: string;
  };
  onSuccess?: (response: DojahWidgetSuccessResponse) => void;
  onError?: (error: unknown) => void;
  onClose?: () => void;
};

export type DojahConnectInstance = {
  setup: () => void;
  open: () => void;
};

export type DojahWidgetSuccessResponse = {
  status?: boolean;
  reference_id?: string;
  verification_status?: string;
  selfie_url?: string;
  message?: string;
  [key: string]: unknown;
};

const WIDGET_SCRIPT_SRC = "https://widget.dojah.io/widget.js";

export function loadDojahWidgetScript(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Dojah widget can only run in the browser."));
  }

  if (typeof window.Connect !== "undefined") {
    return Promise.resolve();
  }

  const existing = document.querySelector<HTMLScriptElement>(
    `script[src="${WIDGET_SCRIPT_SRC}"]`
  );
  if (existing) {
    return new Promise((resolve, reject) => {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Failed to load Dojah widget.")), {
        once: true,
      });
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = WIDGET_SCRIPT_SRC;
    script.async = false;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Dojah widget."));
    document.body.appendChild(script);
  });
}

export function createDojahReferenceId(userId?: string | number | null): string {
  const suffix = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
  const prefix = userId != null ? `ANT-${userId}` : "ANT-KYC";
  const reference = `${prefix}-${suffix}`;
  return reference.length > 10 ? reference : `${reference}-LIVE`;
}

export async function openDojahWidget(options: DojahConnectOptions): Promise<void> {
  await loadDojahWidgetScript();
  if (typeof window.Connect === "undefined") {
    throw new Error("Dojah widget failed to initialize.");
  }

  const connect = new window.Connect(options);
  connect.setup();
  connect.open();
}
