// api/health.js
// Health check endpoint for DigitalOcean
module.exports = function(req, res) {
  res.status(200).json({
    status: 'healthy',
    service: 'joinecogrow-auth',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
};
