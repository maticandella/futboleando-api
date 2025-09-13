const URL_FD = process.env.FD_URL_BASE;
const TOKEN = process.env.FD_API_KEY;

export function getUrlBase(): string {
  if (!URL_FD) throw new Error("FD_URL_BASE no está configurada en .env");
  return URL_FD;
}

export function getHeaders(): Record<string, string | boolean> {
  if (!TOKEN) throw new Error("FD_API_KEY no está configurada en .env");
  return {
    "X-Auth-Token": TOKEN,
    "X-Unfold-Goals": "true"
  };
}