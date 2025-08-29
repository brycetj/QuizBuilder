import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  PORT: process.env.PORT || "3000",
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
  USE_MOCK: process.env.USE_MOCK || "false",
};

export function assertEnv() {
  if (ENV.USE_MOCK === "true") {
    console.warn("⚠️ Running in MOCK mode — no real API calls will be made.");
    return;
  }
  if (!ENV.OPENAI_API_KEY) {
    throw new Error("Missing required env var: OPENAI_API_KEY");
  }
}
