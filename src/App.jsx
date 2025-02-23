import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import LiveAttackFeed from "./Pages/LiveAttackFeed";
import FooterBlock from "./components/Footer";
import VulnerabilityPage from "./Pages/VulnerabilityPage";
import CICDSecurityDashboard from "./Pages/CiCdSecurity";
import ThreatPage from "./Pages/Thretepage";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/Live-Attack" element={<LiveAttackFeed />} />
            <Route path="/vulnerabilities" element={<VulnerabilityPage />} />
            <Route path="/ci-cd-security" element={<CICDSecurityDashboard />} />
            <Route path="/thretepage" element={<ThreatPage />} />
          </Routes>
        </main>
        <FooterBlock />
      </div>
    </Router>
  );
}
