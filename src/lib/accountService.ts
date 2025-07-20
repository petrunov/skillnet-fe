// src/lib/accountService.ts
import { z } from 'zod';

/**
 * Generic API error, thrown whenever a fetch returns non-2xx.
 */
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

// Shape of any `{ detail, message }` error payload
interface ErrorResponse {
  code?: string;
  detail?: string;
  message?: string;
}
function isErrorResponse(value: unknown): value is ErrorResponse {
  return (
    typeof value === 'object' &&
    value !== null &&
    ('detail' in value || 'message' in value)
  );
}

/**
 * Low-level fetch wrapper for all endpoints after login.
 * Sends HTTP-only cookies via `credentials: 'include'`.
 */
async function request<T>(
  path: string,
  options: Omit<RequestInit, 'headers' | 'credentials'> = {}
): Promise<T> {
  const url = `${BASE_PATH}${path}`;
  const res = await fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(options as RequestInit).headers,
    },
  });

  let data: unknown = null;
  const ct = res.headers.get('content-type') ?? '';
  if (ct.includes('application/json')) {
    data = await res.json().catch(() => null);
  }

  if (!res.ok) {
    if (res.status === 401) {
      throw new ApiError('Session expired. Please log in again.', 401, data);
    }
    let message = res.statusText;
    if (isErrorResponse(data)) {
      message = data.detail ?? data.message ?? message;
    }
    throw new ApiError(message, res.status, data);
  }

  return data as T;
}

// --- Schemas & Types ------------------------------------------------

export const LoginPayloadSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
export type LoginPayload = z.infer<typeof LoginPayloadSchema>;

export const LoginResponseSchema = z.object({
  // we don't actually need to parse tokens client-side anymore
  success: z.boolean().optional(),
});
export type LoginResponse = z.infer<typeof LoginResponseSchema>;

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
export type RegisterResponse = unknown;

export const PasswordResetRequestSchema = z.object({
  email: z.string().email(),
});
export type PasswordResetRequest = z.infer<typeof PasswordResetRequestSchema>;

export const PasswordResetConfirmSchema = z.object({
  password: z.string().min(1, { message: 'Password is required' }),
});
export type PasswordResetConfirmRequest = z.infer<
  typeof PasswordResetConfirmSchema
>;

// --- Public API calls ------------------------------------------------

/**
 * Log in via our Next.js proxy. On success the HTTP-only cookies
 * (`token`, `refreshToken`) will be set by the server; no tokens are returned.
 */
export async function login(payload: LoginPayload): Promise<void> {
  const parsed = LoginPayloadSchema.parse(payload);
  const res = await fetch(`${BASE_PATH}/login/`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(parsed),
  });

  let data: unknown = null;
  const ct = res.headers.get('content-type') ?? '';
  if (ct.includes('application/json')) {
    data = await res.json().catch(() => null);
  }

  if (!res.ok) {
    let message = res.statusText;
    if (isErrorResponse(data)) {
      message = data.detail ?? data.message ?? message;
    }
    throw new ApiError(message, res.status, data);
  }
}

/**
 * Register a new user. Relies on cookies for any subsequent auth.
 */
export async function register(
  payload: RegisterPayload
): Promise<RegisterResponse> {
  const parsed = RegisterPayloadSchema.parse(payload);
  return await request<RegisterResponse>('/register', {
    method: 'POST',
    body: JSON.stringify(parsed),
  });
}

/**
 * Request a password reset email.
 */
export async function passwordReset(
  payload: PasswordResetRequest
): Promise<void> {
  const parsed = PasswordResetRequestSchema.parse(payload);
  await request<void>('/password-reset', {
    method: 'POST',
    body: JSON.stringify(parsed),
  });
}

/**
 * Confirm a password reset using uid + token.
 */
export async function passwordResetConfirm(
  uid: string,
  token: string,
  payload: PasswordResetConfirmRequest
): Promise<void> {
  const parsed = PasswordResetConfirmSchema.parse(payload);
  await request<void>(
    `/password-reset-confirm/${encodeURIComponent(uid)}/${encodeURIComponent(
      token
    )}`,
    { method: 'POST', body: JSON.stringify(parsed) }
  );
}

/**
 * Activate a user account via UID + token.
 */
export async function activateAccount(
  uid: string,
  token: string
): Promise<void> {
  await request<void>(
    `/activate/${encodeURIComponent(uid)}/${encodeURIComponent(token)}`,
    {
      method: 'GET',
    }
  );
}

/**
 * Log out by clearing cookies via our proxy.
 */
export async function logout(): Promise<void> {
  await request<void>('/logout', { method: 'POST' });
}

const accountService = {
  login,
  register,
  passwordReset,
  passwordResetConfirm,
  activateAccount,
  logout,
};

export default accountService;
