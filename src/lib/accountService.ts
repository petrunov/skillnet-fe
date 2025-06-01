// src/lib/accountService.ts
import { z } from 'zod';

export class ApiError extends Error {
  status: number;
  data?: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

const BASE_PATH = '/api/accounts';

// --- Zod Schemas and Types ---
export const LoginPayloadSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
export type LoginPayload = z.infer<typeof LoginPayloadSchema>;

export const LoginResponseSchema = z.object({
  access: z.string(),
  refresh: z.string(),
});
export type LoginResponse = z.infer<typeof LoginResponseSchema>;

// Refresh token schema
export const RefreshPayloadSchema = z.object({
  refresh: z.string().min(1),
});
export type RefreshPayload = z.infer<typeof RefreshPayloadSchema>;

export const RefreshResponseSchema = z.object({
  access: z.string(),
});
export type RefreshResponse = z.infer<typeof RefreshResponseSchema>;

// Low‐level fetch wrapper with 401‐refresh retry
async function request<T>(
  path: string,
  options: RequestInit,
  retry = true
): Promise<T> {
  const url = `${BASE_PATH}${path}`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  const access = localStorage.getItem('token');
  if (access) headers['Authorization'] = `Bearer ${access}`;

  const res = await fetch(url, { ...options, headers });
  let data: unknown = null;
  const ct = res.headers.get('content-type') || '';
  if (ct.includes('application/json')) {
    try {
      data = await res.json();
    } catch {}
  }

  // Unauthorized → try refresh once
  if (res.status === 401 && retry) {
    try {
      const newAccess = await refreshAccessToken();
      localStorage.setItem('token', newAccess);
      return request<T>(path, options, false);
    } catch {
      // refresh failed → user must re-login
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      throw new ApiError('Session expired. Please log in again.', 401);
    }
  }

  if (!res.ok) {
    const msg =
      (data && typeof data === 'object' && 'detail' in data
        ? data.detail
        : undefined) ??
      (data && typeof data === 'object' && 'message' in data
        ? data.message
        : undefined) ??
      res.statusText;
    throw new ApiError(String(msg), res.status, data);
  }
  if (data && typeof data === 'object' && 'detail' in data) {
    throw new ApiError(
      typeof data.detail === 'string' ? data.detail : 'Unknown error',
      res.status,
      data
    );
  }
  return data as T;
}

/** call /token/refresh/ to swap refresh→access */
export async function refreshAccessToken(): Promise<string> {
  const stored = localStorage.getItem('refreshToken');
  if (!stored) throw new ApiError('No refresh token', 401);
  const payload = RefreshPayloadSchema.parse({ refresh: stored });
  const result = await request<RefreshResponse>('/token/refresh/', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  const parsed = RefreshResponseSchema.parse(result);
  return parsed.access;
}

/** login as before */
export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const parsed = LoginPayloadSchema.parse(payload);
  const result = await request<LoginResponse>('/login/', {
    method: 'POST',
    body: JSON.stringify(parsed),
  });
  return LoginResponseSchema.parse(result);
}
