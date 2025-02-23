export const RecentReports = () => {
  const reports = [
    {
      id: 1,
      name: "SQL Injection Detected",
      severity: "High",
      date: "2025-02-12",
    },
    {
      id: 2,
      name: "Brute Force Attempt",
      severity: "Critical",
      date: "2025-02-11",
    },
    {
      id: 3,
      name: "XSS Vulnerability",
      severity: "Medium",
      date: "2025-02-10",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-700">
        Recent Security Reports
      </h2>
      <table className="w-full mt-4">
        <thead>
          <tr className="text-left bg-gray-200">
            <th className="p-2">ID</th>
            <th className="p-2">Issue</th>
            <th className="p-2">Severity</th>
            <th className="p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id} className="border-t">
              <td className="p-2">{report.id}</td>
              <td className="p-2">{report.name}</td>
              <td
                className={`p-2 font-bold text-${
                  report.severity === "Critical" ? "red" : "orange"
                }-500`}
              >
                {report.severity}
              </td>
              <td className="p-2">{report.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
