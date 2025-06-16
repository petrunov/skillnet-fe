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

// Interface for JSON error payloads
interface ErrorResponse {
  code?: string;
  detail?: string;
  message?: string;
}

// Type guard for ErrorResponse
function isErrorResponse(value: unknown): value is ErrorResponse {
  return (
    typeof value === 'object' &&
    value !== null &&
    ('detail' in value || 'message' in value)
  );
}

/**
 * Low‐level fetch wrapper that automatically retries on 401 by refreshing the token.
 * Not used by login(), but for all other secured endpoints.
 */
async function request<T>(
  path: string,
  options: RequestInit,
  retry = true
): Promise<T> {
  const url = `${BASE_PATH}${path}`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const access = localStorage.getItem('token');
  if (access) {
    headers['Authorization'] = `Bearer ${access}`;
  }

  const res = await fetch(url, { ...options, headers, credentials: 'include' });
  let data: unknown = null;
  const contentType = res.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    try {
      data = await res.json();
    } catch {
      /* ignore parse errors */
    }
  }

  if (res.status === 401 && retry) {
    try {
      const newAccess = await refreshAccessToken();
      localStorage.setItem('token', newAccess);
      return request<T>(path, options, false);
    } catch {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      throw new ApiError('Session expired. Please log in again.', 401);
    }
  }

  if (!res.ok) {
    let message = res.statusText;
    if (isErrorResponse(data)) {
      if (typeof data.code === 'string') {
        message = data.code;
      } else if (typeof data.detail === 'string') {
        message = data.detail;
      } else if (typeof data.message === 'string') {
        message = data.message;
      }
    }
    throw new ApiError(message, res.status, data);
  }

  // Even if res.ok, some APIs embed { detail: ... } in the JSON
  if (isErrorResponse(data) && typeof data.detail === 'string') {
    throw new ApiError(data.detail, res.status, data);
  }

  return data as T;
}

// --- Auth Schemas --------------------------------------------------

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

export const RefreshPayloadSchema = z.object({
  refresh: z.string().min(1),
});
export type RefreshPayload = z.infer<typeof RefreshPayloadSchema>;

export const RefreshResponseSchema = z.object({
  access: z.string(),
});
export type RefreshResponse = z.infer<typeof RefreshResponseSchema>;

export const RegisterPayloadSchema = z.object({
  userType: z.string(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  company: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  optOutMarketing: z.boolean(),
  dataConsent: z.literal(true),
  acceptTerms: z.literal(true),
});
export type RegisterPayload = z.infer<typeof RegisterPayloadSchema>;

export const RegisterResponseSchema = z.unknown();
export type RegisterResponse = z.infer<typeof RegisterResponseSchema>;

// --- Public API calls ------------------------------------------------

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const parsed = LoginPayloadSchema.parse(payload);

  const res = await fetch(`${BASE_PATH}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(parsed),
    credentials: 'include',
  });

  let data: unknown = null;
  const contentType = res.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    try {
      data = await res.json();
    } catch {
      /* ignore parse errors */
    }
  }

  if (!res.ok) {
    let message = res.statusText;
    if (isErrorResponse(data)) {
      if (typeof data.detail === 'string') {
        message = data.detail;
      } else if (typeof data.message === 'string') {
        message = data.message;
      }
    }
    throw new ApiError(message, res.status, data);
  }

  return LoginResponseSchema.parse(data);
}

export async function register(
  payload: RegisterPayload
): Promise<RegisterResponse> {
  const parsed = RegisterPayloadSchema.parse(payload);
  const result = await request<unknown>('/register', {
    method: 'POST',
    body: JSON.stringify(parsed),
  });
  return RegisterResponseSchema.parse(result);
}

export const PasswordResetRequestSchema = z.object({
  email: z.string().email(),
});
export type PasswordResetRequest = z.infer<typeof PasswordResetRequestSchema>;

export async function passwordReset(
  payload: PasswordResetRequest
): Promise<void> {
  const parsed = PasswordResetRequestSchema.parse(payload);

  const res = await fetch(`${BASE_PATH}/password-reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(parsed),
    credentials: 'include',
  });

  if (!res.ok) {
    let message = res.statusText;
    const ct = res.headers.get('content-type') || '';
    if (ct.includes('application/json')) {
      try {
        const err = await res.json();
        message = err.detail ?? err.message ?? message;
      } catch {}
    }
    throw new ApiError(message, res.status);
  }

  // on HTTP 200, do not inspect `detail` → void return
}

// --- Password Reset Confirm -----------------------------------------

export const PasswordResetConfirmSchema = z.object({
  password: z.string().min(1, { message: 'Password is required' }),
});
export type PasswordResetConfirmRequest = z.infer<
  typeof PasswordResetConfirmSchema
>;

/**
 * Confirm a password reset.
 * Uses same-origin BASE_PATH (no CORS) and no trailing slash.
 */
export async function passwordResetConfirm(
  uid: string,
  token: string,
  payload: PasswordResetConfirmRequest
): Promise<void> {
  const parsed = PasswordResetConfirmSchema.parse(payload);

  const res = await fetch(
    `${BASE_PATH}/password-reset-confirm/${encodeURIComponent(
      uid
    )}/${encodeURIComponent(token)}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(parsed),
      credentials: 'include',
    }
  );

  if (!res.ok) {
    let message = res.statusText;
    const contentType = res.headers.get('content-type') ?? '';
    if (contentType.includes('application/json')) {
      try {
        const errorData: unknown = await res.json();
        if (isErrorResponse(errorData)) {
          if (typeof errorData.detail === 'string') {
            message = errorData.detail;
          } else if (typeof errorData.message === 'string') {
            message = errorData.message;
          }
        }
      } catch {
        /* ignore parse errors */
      }
    }
    throw new ApiError(message, res.status);
  }
}

// --- Token Refresh (used by request()) ------------------------------

async function refreshAccessToken(): Promise<string> {
  const stored = localStorage.getItem('refreshToken');
  if (!stored) {
    throw new ApiError('No refresh token available', 401);
  }

  const payload = RefreshPayloadSchema.parse({ refresh: stored });
  const res = await fetch(`${BASE_PATH}/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
    credentials: 'include',
  });

  let data: unknown = null;
  const contentType = res.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    try {
      data = await res.json();
    } catch {
      /* ignore parse errors */
    }
  }

  if (!res.ok) {
    let message = res.statusText;
    if (isErrorResponse(data)) {
      if (typeof data.detail === 'string') {
        message = data.detail;
      } else if (typeof data.message === 'string') {
        message = data.message;
      }
    }
    throw new ApiError(message, res.status, data);
  }

  const parsed = RefreshResponseSchema.parse(data);
  return parsed.access;
}

/**
 * Activate a user account via UID + token.
 * Parses JSON, unwraps error messages, and throws ApiError on non-2xx.
 */
export async function activateAccount(
  uid: string,
  token: string
): Promise<void> {
  const res = await fetch(
    `${BASE_PATH}/activate/${encodeURIComponent(uid)}/${encodeURIComponent(
      token
    )}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      credentials: 'include',
    }
  );

  // Try to parse JSON body (may contain error details)
  let data: unknown = null;
  const ct = res.headers.get('content-type') ?? '';
  if (ct.includes('application/json')) {
    try {
      data = await res.json();
    } catch {
      /* ignore parse errors */
    }
  }

  // On HTTP error, extract detail/message if present and throw
  if (!res.ok) {
    let message = res.statusText;
    if (data && typeof data === 'object') {
      const err = data as ErrorResponse;

      if (typeof err.code === 'string') {
        message = err.code;
      } else if (typeof err.detail === 'string') {
        message = err.detail;
      } else if (typeof err.message === 'string') {
        message = err.message;
      }
    }
    throw new ApiError(message, res.status, data);
  }
}
