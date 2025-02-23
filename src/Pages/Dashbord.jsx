import { useState, useEffect } from "react";
import {
  FiAlertTriangle,
  FiShield,
  FiCheckCircle,
  FiTrendingUp,
  FiBarChart2,
  FiPieChart,
  FiActivity,
  FiLock,
} from "react-icons/fi";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Bar, Pie, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalVulnerabilities: 0,
    criticalIssues: 0,
    highIssues: 0,
    mediumIssues: 0,
    lowIssues: 0,
    securityScore: 0,
    recentScans: [],
    vulnerabilityTrend: [],
    topVulnerableAssets: [],
  });

  const [graphData, setGraphData] = useState({
    vulnerabilityTrend: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Vulnerabilities",
          data: [65, 78, 56, 89, 63, 75],
          fill: true,
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          tension: 0.4,
        },
      ],
    },
    severityDistribution: {
      labels: ["Critical", "High", "Medium", "Low"],
      datasets: [
        {
          data: [23, 45, 58, 30],
          backgroundColor: [
            "rgba(255, 99, 132, 0.8)",
            "rgba(255, 159, 64, 0.8)",
            "rgba(255, 205, 86, 0.8)",
            "rgba(75, 192, 192, 0.8)",
          ],
        },
      ],
    },
    monthlyScans: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Completed Scans",
          data: [12, 19, 15, 17, 22, 24],
          backgroundColor: "rgba(153, 102, 255, 0.8)",
        },
      ],
    },
    riskTrend: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      datasets: [
        {
          label: "High Risk",
          data: [15, 12, 18, 14],
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Medium Risk",
          data: [25, 22, 28, 24],
          backgroundColor: "rgba(255, 205, 86, 0.5)",
        },
        {
          label: "Low Risk",
          data: [35, 32, 38, 34],
          backgroundColor: "rgba(75, 192, 192, 0.5)",
        },
      ],
    },
    assetVulnerabilities: {
      labels: ["Web Server", "Database", "API Gateway", "Frontend", "Storage"],
      datasets: [
        {
          data: [45, 32, 28, 20, 15],
          backgroundColor: [
            "rgba(255, 99, 132, 0.8)",
            "rgba(54, 162, 235, 0.8)",
            "rgba(255, 206, 86, 0.8)",
            "rgba(75, 192, 192, 0.8)",
            "rgba(153, 102, 255, 0.8)",
          ],
        },
      ],
    },
  });

  useEffect(() => {
    const fetchDashboardData = () => {
      setDashboardData({
        totalVulnerabilities: 156,
        criticalIssues: 23,
        highIssues: 45,
        mediumIssues: 58,
        lowIssues: 30,
        securityScore: 76,
        recentScans: [
          {
            id: 1,
            timestamp: "2025-02-14 15:30:00",
            status: "Completed",
            findings: 12,
          },
          {
            id: 2,
            timestamp: "2025-02-14 12:00:00",
            status: "Completed",
            findings: 8,
          },
          {
            id: 3,
            timestamp: "2025-02-14 09:30:00",
            status: "Completed",
            findings: 15,
          },
        ],
        vulnerabilityTrend: [
          { month: "Jan", count: 145 },
          { month: "Feb", count: 156 },
        ],
        topVulnerableAssets: [
          { name: "Web Server", vulnerabilities: 45, risk: "High" },
          { name: "Database", vulnerabilities: 32, risk: "Medium" },
          { name: "API Gateway", vulnerabilities: 28, risk: "High" },
        ],
      });
    };

    fetchDashboardData();
  }, []);

  const SummaryCard = ({ icon: Icon, title, value, color }) => (
    <div className={`p-6 rounded-lg shadow-lg ${color} text-white`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-80">{title}</p>
          <p className="text-2xl font-bold mt-2">{value}</p>
        </div>
        <Icon className="w-8 h-8 opacity-80" />
      </div>
    </div>
  );

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 10,
          font: {
            size: 11,
          },
        },
      },
      title: {
        display: true,
        font: {
          size: 13,
        },
      },
    },
  };

  const lineOptions = {
    ...chartOptions,
    aspectRatio: 2,
    plugins: {
      ...chartOptions.plugins,
      title: {
        ...chartOptions.plugins.title,
        text: "Vulnerability Trend Over Time",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const barOptions = {
    ...chartOptions,
    aspectRatio: 2,
    plugins: {
      ...chartOptions.plugins,
      title: {
        ...chartOptions.plugins.title,
        text: "Monthly Security Scans",
      },
    },
  };

  const pieOptions = {
    ...chartOptions,
    aspectRatio: 2,
  };

  const GraphSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-lg h-[300px]">
          <Line data={graphData.vulnerabilityTrend} options={lineOptions} />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-lg h-[300px]">
          <Pie
            data={graphData.severityDistribution}
            options={{
              ...pieOptions,
              plugins: {
                ...pieOptions.plugins,
                title: {
                  ...pieOptions.plugins.title,
                  text: "Severity Distribution",
                },
              },
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-lg h-[300px]">
          <Bar data={graphData.monthlyScans} options={barOptions} />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-lg h-[300px]">
          <Doughnut
            data={graphData.assetVulnerabilities}
            options={{
              ...pieOptions,
              plugins: {
                ...pieOptions.plugins,
                title: {
                  ...pieOptions.plugins.title,
                  text: "Vulnerabilities by Asset",
                },
              },
            }}
          />
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-lg h-[300px]">
        <Bar
          data={graphData.riskTrend}
          options={{
            ...barOptions,
            plugins: {
              ...barOptions.plugins,
              title: {
                ...barOptions.plugins.title,
                text: "Weekly Risk Distribution",
              },
            },
            scales: {
              x: {
                stacked: true,
              },
              y: {
                stacked: true,
              },
            },
          }}
        />
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-5xl font-bold text-gray-800 mb-10 mt-6 text-center uppercase">
        Security Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <SummaryCard
          icon={FiAlertTriangle}
          title="Total Vulnerabilities"
          value={dashboardData.totalVulnerabilities}
          color="bg-red-600"
        />
        <SummaryCard
          icon={FiShield}
          title="Security Score"
          value={`${dashboardData.securityScore}%`}
          color="bg-blue-600"
        />
        <SummaryCard
          icon={FiAlertTriangle}
          title="Critical Issues"
          value={dashboardData.criticalIssues}
          color="bg-purple-600"
        />
        <SummaryCard
          icon={FiCheckCircle}
          title="Recent Fixes"
          value={dashboardData.recentScans.length}
          color="bg-green-600"
        />
      </div>

      <div className="mb-8">
        <GraphSection />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            <FiActivity className="inline-block mr-2" />
            Recent Scans
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Timestamp</th>
                  <th className="text-left py-2">Status</th>
                  <th className="text-left py-2">Findings</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.recentScans.map((scan) => (
                  <tr key={scan.id} className="border-b">
                    <td className="py-2">{scan.timestamp}</td>
                    <td className="py-2">
                      <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                        {scan.status}
                      </span>
                    </td>
                    <td className="py-2">{scan.findings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            <FiLock className="inline-block mr-2" />
            Top Vulnerable Assets
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Asset Name</th>
                  <th className="text-left py-2">Vulnerabilities</th>
                  <th className="text-left py-2">Risk Level</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.topVulnerableAssets.map((asset, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2">{asset.name}</td>
                    <td className="py-2">{asset.vulnerabilities}</td>
                    <td className="py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          asset.risk === "High"
                            ? "bg-red-100 text-red-800"
                            : asset.risk === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {asset.risk}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
