import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const CICDSecurityDashboard = () => {
  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [pipelineStatus, setPipelineStatus] = useState({
    build: "✅ Secure",
    test: "⚠️ Issues Detected",
    deploy: "🚨 Failed",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const newAlert = {
        id: Date.now(),
        message: `New vulnerability detected in ${
          ["Build", "Test", "Deploy"][Math.floor(Math.random() * 3)]
        } stage!`,
      };
      setAlerts((prev) => [newAlert, ...prev].slice(0, 5));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setVulnerabilities([
      {
        id: 1,
        name: "SQL Injection",
        severity: "High",
        status: "Unresolved",
        timestamp: "2025-02-23 10:30 AM",
      },
      {
        id: 2,
        name: "Cross-Site Scripting",
        severity: "Medium",
        status: "Unresolved",
        timestamp: "2025-02-23 10:45 AM",
      },
      {
        id: 3,
        name: "Dependency Risk",
        severity: "Low",
        status: "Resolved",
        timestamp: "2025-02-23 11:00 AM",
      },
    ]);
  }, []);

  const resolveVulnerability = (id) => {
    setVulnerabilities((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: "Resolved" } : v))
    );
  };

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Security Issues",
        data: [10, 7, 8, 5, 6],
        backgroundColor: "#e74c3c",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        🚀 CICD Security Dashboard
      </h1>

      <div className="bg-red-200 text-yellow-800 p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold">🔔 Live Security Alerts</h2>
        <ul className="mt-2">
          {alerts.length > 0 ? (
            alerts.map((alert) => (
              <li key={alert.id} className="mt-1">
                ⚠️ {alert.message}
              </li>
            ))
          ) : (
            <li>No new alerts</li>
          )}
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {Object.keys(pipelineStatus).map((stage, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-semibold capitalize">{stage} Status</h2>
            <p className="text-gray-600">{pipelineStatus[stage]}</p>
          </div>
        ))}
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">
          🛡️ Vulnerability Monitoring
        </h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Vulnerability</th>
              <th className="p-2 border">Severity</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Detected At</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {vulnerabilities.map((vuln) => (
              <tr key={vuln.id} className="text-center">
                <td className="p-2 border">{vuln.id}</td>
                <td className="p-2 border">{vuln.name}</td>
                <td
                  className={`p-2 border font-bold ${
                    vuln.severity === "High"
                      ? "text-red-600"
                      : vuln.severity === "Medium"
                      ? "text-yellow-500"
                      : "text-green-600"
                  }`}
                >
                  {vuln.severity}
                </td>
                <td className="p-2 border">{vuln.status}</td>
                <td className="p-2 border">{vuln.timestamp}</td>
                <td className="p-2 border">
                  {vuln.status === "Unresolved" ? (
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-700"
                      onClick={() => resolveVulnerability(vuln.id)}
                    >
                      Fix
                    </button>
                  ) : (
                    <span className="text-gray-500">✔️ Resolved</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">📊 Security Trends</h2>
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default CICDSecurityDashboard;
