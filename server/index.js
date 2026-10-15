import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import config from './config/index.js';
import schemesRouter from './routes/schemes.js';
import profileRouter from './routes/profile.js';
import assistantRouter from './routes/assistant.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';
import { schemes } from './services/schemeData.js';
import { getCacheStats } from './services/tinyfish.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (req.originalUrl !== '/api/health') {
      console.log(`[HTTP] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
    }
  });
  next();
});

// CORS Configuration
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, postman)
    if (!origin) return callback(null, true);
    if (config.corsOrigins.includes(origin) || !config.isProduction) {
      return callback(null, true);
    }
    return callback(null, true); // Permissive for hackathon demo
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'X-API-Key']
}));

// Body Parsing Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    project: 'Vyapar Mitra Backend',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    environment: config.nodeEnv,
    totalCuratedSchemes: schemes.length,
    tinyfishConfigured: Boolean(config.tinyfish.apiKey),
    cacheStats: getCacheStats(),
    memoryUsageMB: Math.round(process.memoryUsage().rss / 1024 / 1024)
  });
});

// API Routes
app.use('/api/schemes', schemesRouter);
app.use('/api/profile', profileRouter);
app.use('/api/assistant', assistantRouter);

// Serve static frontend in production (or when client/dist exists)
const clientDistDir = config.clientDistPath;
if (fs.existsSync(clientDistDir)) {
  console.log(`[Static] Serving client production assets from: ${clientDistDir}`);
  app.use(express.static(clientDistDir));

  // SPA fallback for non-API client routes
  app.get('*', (req, res, next) => {
    if (req.originalUrl.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(clientDistDir, 'index.html'));
  });
} else {
  // Root welcome route if client build is not present
  app.get('/', (req, res) => {
    res.json({
      message: 'Vyapar Mitra API is running',
      version: '1.0.0',
      problemStatement: 'SIH 26092: AI-Driven Scheme Matching for Marginalized Entrepreneurs',
      documentation: {
        health: '/api/health',
        schemes: '/api/schemes',
        schemeCategories: '/api/schemes/categories',
        schemeMatch: 'POST /api/schemes/match',
        schemeSearch: '/api/schemes/search?q=...',
        schemeFetch: '/api/schemes/fetch-details?url=...',
        profiles: '/api/profile',
        assistantChat: 'POST /api/assistant/chat',
        assistantGuide: 'POST /api/assistant/guide'
      }
    });
  });
}

// 404 Handler for undefined API routes
app.use(notFoundHandler);

// Global Error Handler
app.use(errorHandler);

// Start HTTP Server
const server = app.listen(config.port, () => {
  console.log(`=======================================================`);
  console.log(`  🚀 Vyapar Mitra Backend Server running on port ${config.port}`);
  console.log(`  🌐 Environment: ${config.nodeEnv}`);
  console.log(`  🔑 TinyFish API Key: ${config.tinyfish.apiKey ? 'Configured ✅' : 'Missing ❌'}`);
  console.log(`  📊 Loaded ${schemes.length} Curated Indian Govt Schemes`);
  console.log(`  🏥 Health Check: http://localhost:${config.port}/api/health`);
  console.log(`=======================================================`);
});

// Graceful shutdown
const shutdown = (signal) => {
  console.log(`[Server] Received ${signal}. Closing HTTP server gracefully...`);
  server.close(() => {
    console.log('[Server] HTTP server closed. Process terminating cleanly.');
    process.exit(0);
  });

  // Force close after 5 seconds if hanging
  setTimeout(() => {
    console.error('[Server] Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 5000);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

export default app;
