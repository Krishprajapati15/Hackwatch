import React, { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";

const ThreatPage = () => {
  const [threats, setThreats] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedThreat, setSelectedThreat] = useState(null);

  // Simulate incoming threats
  useEffect(() => {
    const interval = setInterval(() => {
      const newThreat = {
        id: Date.now(),
        component: ["Build", "Test", "Deploy", "Monitoring"][
          Math.floor(Math.random() * 4)
        ],
        severity: ["High", "Medium", "Low"][Math.floor(Math.random() * 3)],
        sourceIP: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(
          Math.random() * 255
        )}`,
        location: ["USA", "India", "Germany", "China", "Russia"][
          Math.floor(Math.random() * 5)
        ],
        timestamp: new Date().toLocaleString(),
        status: "Active",
      };
      setThreats((prev) => [newThreat, ...prev].slice(0, 15));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Resolve Threats
  const resolveThreat = (id) => {
    setThreats((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "Resolved" } : t))
    );
  };

  // Filtered Threats
  const filteredThreats = threats.filter(
    (t) =>
      (filter === "All" || t.severity === filter) &&
      t.component.toLowerCase().includes(search.toLowerCase())
  );

  // Threat Trends Data
  const lineChartData = {
    labels: ["10 min ago", "8 min ago", "6 min ago", "4 min ago", "Now"],
    datasets: [
      {
        label: "Threats Detected",
        data: [5, 7, 4, 6, threats.length],
        borderColor: "#e74c3c",
        fill: true,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        🔥 Threat Monitoring Dashboard
      </h1>

      {/* Threat Counter Cards */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-red-500 text-white p-4 rounded-lg shadow text-center">
          <h2 className="text-lg font-semibold">Total Threats</h2>
          <p className="text-2xl font-bold">{threats.length}</p>
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded-lg shadow text-center">
          <h2 className="text-lg font-semibold">Active Threats</h2>
          <p className="text-2xl font-bold">
            {threats.filter((t) => t.status === "Active").length}
          </p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-lg shadow text-center">
          <h2 className="text-lg font-semibold">Resolved Threats</h2>
          <p className="text-2xl font-bold">
            {threats.filter((t) => t.status === "Resolved").length}
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex gap-4 mb-6">
        <select
          className="p-2 border rounded-lg"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All Severities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <input
          type="text"
          placeholder="Search by component..."
          className="p-2 border rounded-lg flex-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Threat Heatmap */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">📊 Threat Trends</h2>
        <Line data={lineChartData} />
      </div>

      {/* Threat Log Table */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">🔍 Threat Log</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Component</th>
              <th className="p-2 border">Severity</th>
              <th className="p-2 border">Source IP</th>
              <th className="p-2 border">Location</th>
              <th className="p-2 border">Timestamp</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredThreats.map((threat) => (
              <tr
                key={threat.id}
                className="text-center cursor-pointer hover:bg-gray-100"
                onClick={() => setSelectedThreat(threat)}
              >
                <td className="p-2 border">{threat.component}</td>
                <td
                  className={`p-2 border ${
                    threat.severity === "High"
                      ? "text-red-600 font-bold"
                      : threat.severity === "Medium"
                      ? "text-yellow-500"
                      : "text-green-600"
                  }`}
                >
                  {threat.severity}
                </td>
                <td className="p-2 border">{threat.sourceIP}</td>
                <td className="p-2 border">{threat.location}</td>
                <td className="p-2 border">{threat.timestamp}</td>
                <td className="p-2 border">{threat.status}</td>
                <td className="p-2 border">
                  {threat.status === "Active" ? (
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-700"
                      onClick={() => resolveThreat(threat.id)}
                    >
                      Resolve
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

      {/* Threat Details Modal */}
      {selectedThreat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Threat Details</h2>
            <p>
              <b>Component:</b> {selectedThreat.component}
            </p>
            <p>
              <b>Severity:</b> {selectedThreat.severity}
            </p>
            <p>
              <b>Source IP:</b> {selectedThreat.sourceIP}
            </p>
            <p>
              <b>Location:</b> {selectedThreat.location}
            </p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
              onClick={() => setSelectedThreat(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThreatPage;
