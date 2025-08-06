module.exports = {
  // Environment configuration
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,
  
  // Security settings
  security: {
    cors: {
      origin: process.env.NODE_ENV === 'production' 
        ? ['https://shadowglass-website.herokuapp.com']
        : ['http://localhost:3000', 'http://127.0.0.1:3000'],
      credentials: true
    },
    helmet: {
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
          fontSrc: ["'self'", "https://fonts.gstatic.com"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", "data:", "https:", "http:"],
          connectSrc: ["'self'", "https:"],
          mediaSrc: ["'self'"],
          objectSrc: ["'none'"],
          baseUri: ["'self'"],
          frameAncestors: ["'none'"],
          formAction: ["'self'"]
        }
      }
    }
  },
  
  // Performance settings
  cache: {
    staticFiles: '1d', // Cache static files for 1 day
    api: '5m' // Cache API responses for 5 minutes
  },
  
  // Compression settings
  compression: {
    level: 6, // Compression level (0-9)
    threshold: 1024 // Only compress files larger than 1KB
  },
  
  // Rate limiting (if needed in future)
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // Limit each IP to 100 requests per windowMs
  }
};
