import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const LiveAttackFeed = () => {
  const [website, setWebsite] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState(null);
  const [error, setError] = useState("");
  const [scanProgress, setScanProgress] = useState(0);
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [loadingText, setLoadingText] = useState("");
  const currentUser = "Krishprajapati15";

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const year = now.getUTCFullYear();
      const month = String(now.getUTCMonth() + 1).padStart(2, "0");
      const day = String(now.getUTCDate()).padStart(2, "0");
      const hours = String(now.getUTCHours()).padStart(2, "0");
      const minutes = String(now.getUTCMinutes()).padStart(2, "0");
      const seconds = String(now.getUTCSeconds()).padStart(2, "0");

      setCurrentDateTime(
        `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
      );
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // Loading text animation
  useEffect(() => {
    if (isScanning) {
      const texts = [
        "Initializing scan...",
        "Analyzing target...",
        "Checking vulnerabilities...",
        "Scanning ports...",
        "Testing security measures...",
        "Identifying potential threats...",
        "Almost there...",
      ];
      let currentIndex = 0;

      const textInterval = setInterval(() => {
        setLoadingText(texts[currentIndex]);
        currentIndex = (currentIndex + 1) % texts.length;
      }, 2000);

      return () => clearInterval(textInterval);
    }
  }, [isScanning]);

  const handleScan = async (e) => {
    e.preventDefault();

    if (!website) {
      setError("Please enter a website URL");
      return;
    }

    let urlToScan = website.trim();
    if (!urlToScan.startsWith("http://") && !urlToScan.startsWith("https://")) {
      urlToScan = "https://" + urlToScan;
    }

    try {
      setIsScanning(true);
      setError("");
      setScanProgress(0);
      setScanResults(null);

      const progressInterval = setInterval(() => {
        setScanProgress((prev) => Math.min(prev + 1, 90));
      }, 100);

      const response = await axios.post(
        "http://localhost:3000/api/scan",
        {
          website: urlToScan,
          userLogin: currentUser,
          scanTime: currentDateTime,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      clearInterval(progressInterval);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setScanProgress(100);

      await new Promise((resolve) => setTimeout(resolve, 500));
      setScanResults(response.data);
    } catch (err) {
      console.error("Scan error:", err);
      setError(
        err.response?.data?.message ||
          "Failed to scan website. Please check the URL and try again."
      );
      setScanProgress(0);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with falling line animation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 relative"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Live Attack Feed
          </h1>
          <div className="text-gray-400 space-y-1 ">
            <p>
              Current Date and Time (UTC - YYYY-MM-DD HH:MM:SS formatted):{" "}
              {currentDateTime}
            </p>
            <p>Current User's Login Status: {currentUser}</p>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1 }}
            className="absolute bottom-15 left-0 w-full h-0.5 bg-blue-500 "
          />
        </motion.div>

        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <form onSubmit={handleScan} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="Enter website URL (e.g., example.com)"
                className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isScanning}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isScanning}
                className={`px-6 py-2 rounded-lg font-semibold ${
                  isScanning
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white transition-colors`}
              >
                {isScanning ? "Scanning..." : "Start Scan"}
              </motion.button>
            </div>
          </form>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-red-400 text-center"
            >
              {error}
            </motion.div>
          )}
        </div>

        {/* Enhanced Scan Progress with animations */}
        {isScanning && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gray-800 rounded-lg p-6 mb-8"
          >
            <div className="space-y-4">
              <div className="relative w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-blue-500"
                  style={{ width: `${scanProgress}%` }}
                  animate={{ width: [`${scanProgress}%`] }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="text-center space-y-2">
                <motion.p
                  key={loadingText}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-blue-400"
                >
                  {loadingText}
                </motion.p>
                <p className="text-blue-400">
                  Scanning {website} for vulnerabilities... {scanProgress}%
                </p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-gray-400 text-sm"
                >
                  Please wait a few moments while we analyze the target
                </motion.p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Results Display with enhanced animations */}
        <AnimatePresence>
          {scanResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800 rounded-lg p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Scan Results</h2>
                <p className="text-sm text-gray-400">
                  Scan completed at {currentDateTime}
                </p>
              </div>

              {/* Summary Stats with fade-in animation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
              >
                <div className="bg-gray-700 rounded-lg p-4 text-center">
                  <motion.p
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-2xl font-bold text-red-500"
                  >
                    {scanResults.summary?.critical || 0}
                  </motion.p>
                  <p className="text-gray-400">Critical</p>
                </div>
                <div className="bg-gray-700 rounded-lg p-4 text-center">
                  <motion.p
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-2xl font-bold text-orange-500"
                  >
                    {scanResults.summary?.high || 0}
                  </motion.p>
                  <p className="text-gray-400">High</p>
                </div>
                <div className="bg-gray-700 rounded-lg p-4 text-center">
                  <motion.p
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-2xl font-bold text-yellow-500"
                  >
                    {scanResults.summary?.medium || 0}
                  </motion.p>
                  <p className="text-gray-400">Medium</p>
                </div>
                <div className="bg-gray-700 rounded-lg p-4 text-center">
                  <motion.p
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-2xl font-bold text-green-500"
                  >
                    {scanResults.summary?.low || 0}
                  </motion.p>
                  <p className="text-gray-400">Low</p>
                </div>
              </motion.div>

              {/* Vulnerabilities List with staggered animation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="space-y-4"
              >
                {scanResults.attacks?.map((attack, index) => (
                  <motion.div
                    key={attack.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.8 }}
                    className="bg-gray-700 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-white font-medium">
                          {attack.type}
                        </h3>
                        <p className="text-gray-400 text-sm mt-1">
                          Path: {attack.path}
                        </p>
                      </div>
                      <span
                        className={`${
                          attack.severity === "Critical"
                            ? "text-red-500"
                            : attack.severity === "High"
                            ? "text-orange-500"
                            : attack.severity === "Medium"
                            ? "text-yellow-500"
                            : "text-green-500"
                        } font-semibold`}
                      >
                        {attack.severity}
                      </span>
                    </div>
                    <div className="mt-4 space-y-2">
                      <p className="text-gray-400">
                        <span className="text-gray-500">Description:</span>{" "}
                        {attack.description}
                      </p>
                      <p className="text-gray-400">
                        <span className="text-gray-500">Impact:</span>{" "}
                        {attack.impact}
                      </p>
                      <p className="text-gray-400">
                        <span className="text-gray-500">Recommendation:</span>{" "}
                        {attack.recommendation}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LiveAttackFeed;
