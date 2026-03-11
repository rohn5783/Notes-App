import axios from "axios";

function normalizeBaseUrl(raw) {
  if (!raw) return "";
  let s = String(raw).trim();

  // If someone accidentally concatenates two URLs (e.g. Vercel URL + backend URL),
  // keep only the last http(s) URL.
  const lastHttps = s.lastIndexOf("https://");
  const lastHttp = s.lastIndexOf("http://");
  const start = Math.max(lastHttps, lastHttp);
  if (start > 0) s = s.slice(start);

  // Remove trailing slashes to avoid // in requests.
  s = s.replace(/\/+$/, "");
  return s;
}

const FALLBACK_BASE_URL = "http://localhost:3000";

export const api = axios.create({
  baseURL: normalizeBaseUrl(import.meta.env.VITE_API_URL) || FALLBACK_BASE_URL,
  withCredentials: true,
});

