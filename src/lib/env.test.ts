import { describe, it, expect, vi, beforeEach } from "vitest";

import { getServerEnv, getClientEnv } from "./env";

const VALID_ENV = {
  NEXT_PUBLIC_SUPABASE_URL: "https://test.supabase.co",
  NEXT_PUBLIC_SUPABASE_ANON_KEY: "test-anon-key",
  SUPABASE_SERVICE_ROLE_KEY: "test-service-role-key",
  NEXT_PUBLIC_APP_URL: "http://localhost:3000",
  NEXT_PUBLIC_APP_NAME: "Test App",
  NODE_ENV: "test" as const,
};

describe("getServerEnv()", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", VALID_ENV.NEXT_PUBLIC_SUPABASE_URL);
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", VALID_ENV.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", VALID_ENV.SUPABASE_SERVICE_ROLE_KEY);
    vi.stubEnv("NEXT_PUBLIC_APP_URL", VALID_ENV.NEXT_PUBLIC_APP_URL);
    vi.stubEnv("NEXT_PUBLIC_APP_NAME", VALID_ENV.NEXT_PUBLIC_APP_NAME);
    vi.stubEnv("NODE_ENV", VALID_ENV.NODE_ENV);
  });

  it("returns typed env when all required vars are present", () => {
    const env = getServerEnv();
    expect(env.NEXT_PUBLIC_SUPABASE_URL).toBe(VALID_ENV.NEXT_PUBLIC_SUPABASE_URL);
    expect(env.SUPABASE_SERVICE_ROLE_KEY).toBe(VALID_ENV.SUPABASE_SERVICE_ROLE_KEY);
  });

  it("throws when SUPABASE_SERVICE_ROLE_KEY is missing", () => {
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "");
    expect(() => getServerEnv()).toThrow("Invalid environment variables");
  });

  it("throws when SUPABASE_URL is not a valid URL", () => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "not-a-url");
    expect(() => getServerEnv()).toThrow("Invalid environment variables");
  });
});

describe("getClientEnv()", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", VALID_ENV.NEXT_PUBLIC_SUPABASE_URL);
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", VALID_ENV.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    vi.stubEnv("NEXT_PUBLIC_APP_URL", VALID_ENV.NEXT_PUBLIC_APP_URL);
    vi.stubEnv("NEXT_PUBLIC_APP_NAME", VALID_ENV.NEXT_PUBLIC_APP_NAME);
  });

  it("returns only public env vars", () => {
    const env = getClientEnv();
    expect(env.NEXT_PUBLIC_SUPABASE_URL).toBe(VALID_ENV.NEXT_PUBLIC_SUPABASE_URL);
    // Service role should not exist on client env type
    expect(env).not.toHaveProperty("SUPABASE_SERVICE_ROLE_KEY");
  });
});
