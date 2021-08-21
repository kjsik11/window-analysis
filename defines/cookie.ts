export const COOKIE_KEY_ACCESS_TOKEN = 'jb.accessToken';
export const COOKIE_KEY_REDIRECT_URL = 'jb.redirectUrl';

export const defaultCookieOptions = {
  path: '/',
  sameSite: 'lax',
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
} as const;
