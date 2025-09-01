// src/config.ts
const backendIP = "192.168.1.5"; // ⬅️ replace this with your laptop's IPv4
const backendPort = "3000";       // Next.js dev server port

export const API_BASE_URL = `http://${backendIP}:${backendPort}/api`;
