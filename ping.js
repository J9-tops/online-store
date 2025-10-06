import "dotenv/config";
import fetch from "node-fetch";

const DB_URL = process.env.PING_URL ?? "";
const API_KEY = process.env.PING_KEY ?? "";

async function ping() {
  try {
    const response = await fetch(DB_URL, {
      headers: { apikey: API_KEY },
    });

    console.log(`✅ Pinged DB Successful: ${response.status}`);
  } catch (error) {
    console.error("❌ Ping failed:", error);
  }
}

ping();
