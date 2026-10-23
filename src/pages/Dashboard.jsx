import { useEffect, useState } from 'react';
import DashboardHeader from '../components/DashboardHeader.jsx';
import StatCard from '../components/StatCard.jsx';
import AttendanceChart from '../components/AttendanceChart.jsx';
import ShiftCoverageChart from '../components/ShiftCoverageChart.jsx';
import IncidentsChart from '../components/IncidentsChart.jsx';
import ActiveGuards from '../components/ActiveGuards.jsx';
import SitesStatus from '../components/SitesStatus.jsx';
import SitesMap from '../components/SitesMap.jsx';
import RecentIncidents from '../components/RecentIncidents.jsx';
import ContractRenewals from '../components/ContractRenewals.jsx';
import RecentActivities from '../components/RecentActivities.jsx';
import { kpis } from '../data/mockData.js';

export default function Dashboard() {
  const [clientCount, setClientCount] = useState(0);
  useEffect(() => {
    const refresh = () => { try { const rows = JSON.parse(localStorage.getItem('megsi-clients') || '[]'); setClientCount(Array.isArray(rows) ? rows.length : 0); } catch { setClientCount(0); } };
    refresh(); window.addEventListener('storage', refresh); window.addEventListener('megsi-data-changed', refresh);
    return () => { window.removeEventListener('storage', refresh); window.removeEventListener('megsi-data-changed', refresh); };
  }, []);
  return (
    <div className="dashboard">
      <DashboardHeader />

      <section className="grid grid--kpi" aria-label="Key metrics">
        {kpis.map((item) => {
          const displayItem = item.id === 'clients' && clientCount > 0 ? { ...item, value: String(Number(item.value) + clientCount), sub: `${20 + clientCount} active clients` } : item;
          return <StatCard key={item.id} item={displayItem} />;
        })}
      </section>

      <section className="grid grid--analytics" aria-label="Analytics">
        <AttendanceChart />
        <ShiftCoverageChart />
        <IncidentsChart />
      </section>

      <section className="grid grid--ops" aria-label="Operations">
        <ActiveGuards />
        <SitesStatus />
        <SitesMap />
      </section>

      <section className="grid grid--activity" aria-label="Activity">
        <RecentIncidents />
        <ContractRenewals />
        <RecentActivities />
      </section>
    </div>
  );
}
