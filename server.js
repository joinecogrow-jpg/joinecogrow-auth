const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
const nodemailer = require("nodemailer");
const { body, validationResult } = require("express-validator");

const app = express();
const PORT = process.env.PORT || 8081;

// Middleware
app.use(express.json());
app.use(cors());

// In-memory database (replace with real DB in production)
const users = new Map();
const sessions = new Map();
const resetTokens = new Map();

// Email configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "noreply@joinecogrow.com",
    pass: process.env.EMAIL_PASS || "your-app-password"
  }
});

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || "joinecogrow-secret-2025";

// ==================== ENDPOINTS ====================

// Health Check
app.get("/health", (req, res) => {
  res.json({ status: "Auth Service Running", timestamp: new Date() });
});

// 1. USER REGISTRATION
app.post("/auth/register", [
  body("email").isEmail(),
  body("password").isLength({ min: 8 }),
  body("username").isLength({ min: 3 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, username, fullName, country } = req.body;

  // Check if user exists
  if (users.has(email)) {
    return res.status(409).json({ error: "User already exists" });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create user object with all 750+ features support
  const user = {
    id: Date.now().toString(),
    email,
    username,
    fullName,
    password: hashedPassword,
    country: country || "US",
    createdAt: new Date(),
    
    // Authentication
    twoFactorEnabled: false,
    twoFactorSecret: null,
    emailVerified: false,
    phoneVerified: false,
    
    // Profile for 750+ features
    profile: {
      level: 1,
      xp: 0,
      ecoCoins: 100, // Starting bonus
      achievements: [],
      builds: [],
      trees: [],
      challenges: []
    },
    
    // Permissions
    roles: ["user"],
    subscription: "free",
    
    // Settings
    settings: {
      language: "en",
      currency: "USD",
      timezone: "UTC",
      notifications: true,
      privacy: "public"
    }
  };

  users.set(email, user);

  // Generate verification token
  const verifyToken = jwt.sign({ email }, JWT_SECRET, { expiresIn: "24h" });

  // Send welcome email
  try {
    await transporter.sendMail({
      from: "JoinEcoGrow <noreply@joinecogrow.com>",
      to: email,
      subject: "Welcome to JoinEcoGrow - Verify Your Email",
      html: `
        <h1>Welcome to JoinEcoGrow!</h1>
        <p>You now have access to 750+ eco-growing features!</p>
        <p>Click to verify: <a href="http://localhost:8081/auth/verify?token=${verifyToken}">Verify Email</a></p>
        <p>Your starting bonus: 100 EcoCoins!</p>
      `
    });
  } catch (error) {
    console.error("Email error:", error);
  }

  res.status(201).json({
    message: "User registered successfully",
    userId: user.id,
    verificationSent: true
  });
});

// 2. USER LOGIN
app.post("/auth/login", [
  body("email").isEmail(),
  body("password").exists()
], async (req, res) => {
  const { email, password, deviceInfo } = req.body;

  const user = users.get(email);
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const passwordValid = await bcrypt.compare(password, user.password);
  if (!passwordValid) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Check if 2FA is enabled
  if (user.twoFactorEnabled) {
    const tempToken = jwt.sign({ email, require2FA: true }, JWT_SECRET, { expiresIn: "5m" });
    return res.json({ require2FA: true, tempToken });
  }

  // Generate tokens
  const accessToken = jwt.sign(
    { 
      id: user.id, 
      email: user.email, 
      roles: user.roles,
      subscription: user.subscription 
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  const refreshToken = jwt.sign(
    { id: user.id, type: "refresh" },
    JWT_SECRET,
    { expiresIn: "30d" }
  );

  // Create session
  const session = {
    userId: user.id,
    accessToken,
    refreshToken,
    deviceInfo,
    createdAt: new Date(),
    lastActivity: new Date()
  };

  sessions.set(accessToken, session);

  res.json({
    message: "Login successful",
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
      profile: user.profile,
      settings: user.settings
    }
  });
});

// 3. TWO-FACTOR AUTHENTICATION SETUP
app.post("/auth/2fa/setup", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = users.get(decoded.email);

    // Generate secret
    const secret = speakeasy.generateSecret({
      name: `JoinEcoGrow (${user.email})`
    });

    user.twoFactorSecret = secret.base32;

    // Generate QR code
    const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url);

    res.json({
      secret: secret.base32,
      qrCode: qrCodeUrl,
      manualEntry: secret.base32
    });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
});

// 4. VERIFY 2FA
app.post("/auth/2fa/verify", (req, res) => {
  const { tempToken, code } = req.body;

  try {
    const decoded = jwt.verify(tempToken, JWT_SECRET);
    const user = users.get(decoded.email);

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: "base32",
      token: code,
      window: 2
    });

    if (!verified) {
      return res.status(401).json({ error: "Invalid 2FA code" });
    }

    // Generate real tokens after 2FA
    const accessToken = jwt.sign(
      { id: user.id, email: user.email, roles: user.roles },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "2FA verification successful",
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        profile: user.profile
      }
    });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
});

// 5. PASSWORD RESET REQUEST
app.post("/auth/password/reset-request", async (req, res) => {
  const { email } = req.body;
  const user = users.get(email);

  if (!user) {
    return res.json({ message: "If email exists, reset link sent" });
  }

  const resetToken = jwt.sign({ email, type: "reset" }, JWT_SECRET, { expiresIn: "1h" });
  resetTokens.set(resetToken, email);

  // Send reset email
  try {
    await transporter.sendMail({
      from: "JoinEcoGrow <noreply@joinecogrow.com>",
      to: email,
      subject: "Password Reset Request",
      html: `
        <h1>Reset Your Password</h1>
        <p>Click here to reset: <a href="http://localhost:3000/reset?token=${resetToken}">Reset Password</a></p>
        <p>This link expires in 1 hour.</p>
      `
    });
  } catch (error) {
    console.error("Email error:", error);
  }

  res.json({ message: "If email exists, reset link sent" });
});

// 6. PASSWORD RESET
app.post("/auth/password/reset", async (req, res) => {
  const { token, newPassword } = req.body;

  const email = resetTokens.get(token);
  if (!email) {
    return res.status(400).json({ error: "Invalid or expired token" });
  }

  const user = users.get(email);
  user.password = await bcrypt.hash(newPassword, 12);
  resetTokens.delete(token);

  res.json({ message: "Password reset successful" });
});

// 7. REFRESH TOKEN
app.post("/auth/refresh", (req, res) => {
  const { refreshToken } = req.body;

  try {
    const decoded = jwt.verify(refreshToken, JWT_SECRET);
    
    if (decoded.type !== "refresh") {
      return res.status(401).json({ error: "Invalid token type" });
    }

    // Generate new access token
    const accessToken = jwt.sign(
      { id: decoded.id },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ accessToken });
  } catch (error) {
    res.status(401).json({ error: "Invalid refresh token" });
  }
});

// 8. LOGOUT
app.post("/auth/logout", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    sessions.delete(token);
  }
  res.json({ message: "Logged out successfully" });
});

// 9. GET USER PROFILE
app.get("/auth/profile", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = Array.from(users.values()).find(u => u.id === decoded.id);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      id: user.id,
      email: user.email,
      username: user.username,
      profile: user.profile,
      settings: user.settings,
      subscription: user.subscription
    });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
});

// 10. UPDATE PROFILE
app.put("/auth/profile", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = Array.from(users.values()).find(u => u.id === decoded.id);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update profile fields
    const { fullName, country, settings } = req.body;
    if (fullName) user.fullName = fullName;
    if (country) user.country = country;
    if (settings) user.settings = { ...user.settings, ...settings };

    res.json({ message: "Profile updated", user });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
});

app.listen(PORT, () => {
  console.log(`Auth Service running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
// Health Check with route prefix support
app.get("/auth/health", (req, res) => {
  res.json({
    status: "Auth Service Running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});
// Health Check with route prefix support
app.get("/auth/health", (req, res) => {
  res.json({
    status: "Auth Service Running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});
// Health Check with route prefix support
app.get("/auth/health", (req, res) => {
  res.json({
    status: "Auth Service Running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});
