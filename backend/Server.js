const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const dns = require("dns");
const { promisify } = require("util");

const app = express();

const dnsLookup = promisify(dns.lookup);

app.use(
  cors({
    origin: ["http://localhost:5173", "*"],
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

const vulnerabilityTypes = [
  {
    type: "SQL Injection",
    description: "SQL injection vulnerability detected in input parameters",
    impact: "Critical - Database could be compromised",
    recommendation: "Implement parameterized queries and input validation",
  },
  {
    type: "Cross-Site Scripting (XSS)",
    description: "XSS vulnerability found in user input handling",
    impact: "High - Client-side code execution risk",
    recommendation: "Implement proper output encoding and CSP",
  },
  {
    type: "Directory Traversal",
    description: "Path traversal vulnerability detected",
    impact: "Critical - File system access risk",
    recommendation: "Sanitize file paths and restrict directory access",
  },
  {
    type: "Authentication Bypass",
    description: "Potential authentication bypass detected",
    impact: "Critical - Unauthorized access possible",
    recommendation: "Implement proper authentication checks",
  },
];

const scanHistory = new Map();

async function validateWebsite(url) {
  try {
    const hostname = url.replace(/^https?:\/\//, "").split("/")[0];

    await dnsLookup(hostname);
    return true;
  } catch (error) {
    console.error("DNS lookup failed:", error);
    return false;
  }
}

// Main scan endpoint
app.post("/api/scan", async (req, res) => {
  try {
    const { website, userLogin } = req.body;

    if (!website) {
      return res.status(400).json({
        success: false,
        message: "Website URL is required",
        timestamp: moment().format("YYYY-MM-DD HH:mm:ss"),
      });
    }

    // Validate website existence
    const isValidWebsite = await validateWebsite(website);

    if (!isValidWebsite) {
      return res.status(404).json({
        success: false,
        message: "Website does not exist or is not accessible",
        timestamp: moment().format("YYYY-MM-DD HH:mm:ss"),
      });
    }

    const numVulnerabilities = Math.floor(Math.random() * 4) + 2;
    const attacks = Array.from({ length: numVulnerabilities }, () => {
      const vulnerability =
        vulnerabilityTypes[
          Math.floor(Math.random() * vulnerabilityTypes.length)
        ];
      return {
        id: uuidv4(),
        ...vulnerability,
        severity: ["Critical", "High", "Medium", "Low"][
          Math.floor(Math.random() * 4)
        ],
        path: `${website}${
          ["/login", "/admin", "/api", "/user"][Math.floor(Math.random() * 4)]
        }`,
        timestamp: moment().format("YYYY-MM-DD HH:mm:ss"),
        detectedBy: userLogin,
      };
    });

    const summary = {
      total: attacks.length,
      critical: attacks.filter((a) => a.severity === "Critical").length,
      high: attacks.filter((a) => a.severity === "High").length,
      medium: attacks.filter((a) => a.severity === "Medium").length,
      low: attacks.filter((a) => a.severity === "Low").length,
    };

    const scanResult = {
      id: uuidv4(),
      website,
      userLogin,
      timestamp: moment().format("YYYY-MM-DD HH:mm:ss"),
      attacks,
      summary,
      status: "completed",
    };

    // Store in history
    scanHistory.set(scanResult.id, scanResult);

    // Send response
    res.json({
      success: true,
      ...scanResult,
    });
  } catch (error) {
    console.error("Scan error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error during scan",
      timestamp: moment().format("YYYY-MM-DD HH:mm:ss"),
    });
  }
});

app.get("/api/scan-history", (req, res) => {
  const history = Array.from(scanHistory.values());
  res.json({
    success: true,
    history,
    timestamp: moment().format("YYYY-MM-DD HH:mm:ss"),
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  const startTime = moment().format("YYYY-MM-DD HH:mm:ss");
  console.log(`Server running on port ${PORT}`);
  console.log(`Current Time (UTC): ${startTime}`);
  console.log(`Server started by: Krishprajapati15`);
});
