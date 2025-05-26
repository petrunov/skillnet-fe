// src/lib/accountService.ts
import { z } from 'zod';

const BASE_PATH = '/api/accounts';

// --- Zod Schemas and Types ---
export const LoginPayloadSchema = z.object({
  username: z.string().email(),
  password: z.string().min(6),
});
export type LoginPayload = z.infer<typeof LoginPayloadSchema>;

export const LoginResponseSchema = z.object({
  access: z.string(),
  refresh: z.string(),
});
export type LoginResponse = z.infer<typeof LoginResponseSchema>;

// Custom Error for API failures
export class ApiError extends Error {
  public status: number;
  public data: unknown;
  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

// --- Low-level request helper ---
async function request<T>(path: string, options: RequestInit): Promise<T> {
  const url = `${BASE_PATH}${path}`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Attach JWT if present
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // Attempt to parse JSON if content-type indicates JSON
  let data: unknown = null;
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    try {
      data = await response.json();
    } catch {
      // ignore JSON parse errors
    }
  }

  // Handle HTTP errors
  if (!response.ok) {
    const message = data?.detail ?? data?.message ?? response.statusText;
    throw new ApiError(message, response.status, data);
  }

  // Handle success responses with error detail payload
  if (data && typeof data === 'object' && 'detail' in data) {
    throw new ApiError(data.detail, response.status, data);
  }

  return data as T;
}

// --- Domain-specific API functions ---

/**
 * Perform login with email (username) & password.
 * On success returns JWT tokens.
 * Throws ApiError on failure.
 */
export async function login(payload: LoginPayload): Promise<LoginResponse> {
  // Validate request
  const parsed = LoginPayloadSchema.parse(payload);

  console.log(payload);

  // Call API
  const result = await request<LoginResponse>('/login/', {
    method: 'POST',
    body: JSON.stringify(parsed),
  });

  console.log(result);

  // Validate response
  return LoginResponseSchema.parse(result);
}

/**
 * Perform logout by blacklisting refresh token.
 */
export async function logout(refresh: string): Promise<void> {
  await request<void>('/logout/', {
    method: 'POST',
    body: JSON.stringify({ refresh }),
  });
}

// Additional endpoints (password-reset, register, etc.) can be added similarly
