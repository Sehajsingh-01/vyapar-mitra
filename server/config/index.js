import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
  port: parseInt(process.env.PORT, 10) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  corsOrigins: [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    process.env.CLIENT_URL
  ].filter(Boolean),
  tinyfish: {
    apiKey: process.env.TINYFISH_API_KEY || 'sk-tinyfish-8FYAUZAHSWiSsU6Rfv0PaBJNLxClTtJv',
    searchUrl: process.env.TINYFISH_SEARCH_URL || 'https://api.search.tinyfish.ai',
    fetchUrl: process.env.TINYFISH_FETCH_URL || 'https://api.fetch.tinyfish.ai',
    agentUrl: process.env.TINYFISH_AGENT_URL || 'https://agent.tinyfish.ai/v1/automation/run',
    cacheTtlSeconds: parseInt(process.env.CACHE_TTL_SECONDS, 10) || 600, // 10 minutes
  },
  clientDistPath: path.resolve(__dirname, '../../client/dist')
};

export default config;
