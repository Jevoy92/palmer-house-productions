const BASE_URL = `https://${process.env.EXPO_PUBLIC_DOMAIN}/api`;

export function getApiUrl(path: string): string {
  return `${BASE_URL}${path}`;
}
