import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { Printer, PrinterStats } from '../../Types';
import './PrinterCard.css';

interface Props {
  printer: Printer;
  onClick: () => void;
}

const getServerUrl = () => {
  let url = localStorage.getItem('serverUrl') || 'http://127.0.0.1:8080';
  if (url.endsWith('/')) url = url.slice(0, -1);
  return url;
};

export default function PrinterCard({ printer, onClick }: Props) {
  const [stats, setStats] = useState<PrinterStats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data: PrinterStats = await invoke('get_printer_stats', {
          serverUrl: getServerUrl(),
          id: printer.id,
        });
        setStats(data);
      } catch (e) {}
    };

    fetchStats();
    const interval = setInterval(fetchStats, 3000);
    return () => clearInterval(interval);
  }, [printer.id]);

  const isPrinting = stats?.currentStatus?.toLowerCase().includes("print") || (stats?.progressPercent ?? 0) > 0;

  return (
    <div
      className={`printer-card ${isPrinting ? 'is-printing' : 'is-idle'}`}
      onClick={onClick}
    >
      <div className="printer-card-header">
        <h3 className="printer-card-title">{printer.name}</h3>
        <span className={`status-badge ${isPrinting ? 'printing' : 'idle'}`} style={{ fontSize: '0.7rem' }}>
          {stats?.currentStatus || "OFFLINE"}
        </span>
      </div>

      <div className="printer-card-camera">
        <img
          src={`${getServerUrl()}/api/v1/printers/${printer.id}/camera`}
          alt={`Kamera för ${printer.name}`}
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />
      </div>

      <div className="printer-card-stats">
        <div><span className="stat-highlight">NZL:</span> {stats?.nozzleTemp || 0}°C</div>
        <div><span className="stat-highlight">BED:</span> {stats?.bedTemp || 0}°C</div>
      </div>

      <div className="progress-bar-bg printer-card-progress">
        <div className="progress-bar-fill" style={{ width: `${stats?.progressPercent || 0}%` }}></div>
      </div>
    </div>
  );
}