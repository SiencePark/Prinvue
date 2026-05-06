import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { Printer, PrinterStats } from '../../Types';
import './Dashboard.css';

interface Props {
  printer: Printer | null;
  onEdit: () => void;
  onDelete: (id: string) => void;
}

const getServerUrl = () => {
  let url = localStorage.getItem('serverUrl') || 'http://127.0.0.1:8080';
  if (url.endsWith('/')) url = url.slice(0, -1);
  return url;
};

export default function Dashboard({ printer, onEdit, onDelete }: Props) {
  const [stats, setStats] = useState<PrinterStats | null>(null);

  useEffect(() => {
    if (!printer) return;

    const fetchStats = async () => {
      try {
        const data: PrinterStats = await invoke('get_printer_stats', {
          serverUrl: getServerUrl(),
          id: printer.id,
        });
        setStats(data);
      } catch (e) {
        console.error("Fel vid hämtning av stats", e);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 2000);
    return () => clearInterval(interval);
  }, [printer]);

  if (!printer) return null;

  const isPrinting = stats?.currentStatus?.toLowerCase().includes("print") || (stats?.progressPercent ?? 0) > 0;

  return (
    <main className="dashboard">
      <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          {printer.name}
          <span className={`status-badge ${isPrinting ? 'printing' : 'idle'}`}>
            {stats?.currentStatus || "OFFLINE"}
          </span>
        </div>

        <div className="action-buttons">
          <button className="btn-edit" onClick={onEdit}>Redigera</button>
          <button className="btn-delete" onClick={() => printer.id && onDelete(printer.id)}>
            Ta bort
          </button>
        </div>
      </div>

      <div className="dashboard-grid">
          <div className="camera-container">
            <img
              src={`${getServerUrl()}/api/v1/printers/${printer.id}/camera`}
              alt="Live feed"
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
          </div>

        <div className="stats-grid">
          <div className="stat-card" style={{ gridColumn: 'span 2' }}>
            <span className="stat-label">Progress</span>
            <div className="stat-value">{stats?.progressPercent || 0}%</div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: `${stats?.progressPercent || 0}%` }}></div>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-label">Nozzle</span>
            <span className="stat-value">{stats?.nozzleTemp || 0}°C</span>
          </div>

          <div className="stat-card">
            <span className="stat-label">Bed</span>
            <span className="stat-value">{stats?.bedTemp || 0}°C</span>
          </div>
        </div>
      </div>
    </main>
  );
}