import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import AddPrinterModal from "./components/AddPrinterModal/AddPrinterModal";
import { Printer } from "./Types";
import PrinterCard from "./components/Dashboard/PrinterCard";
import EditPrinterModal from "./components/EditPrinterModal/EditPrinterModal";
import Settings from "./components/Settings/Settings";
import Documentation from "./components/Documentation/Documentation";
import "./App.css";

type ViewState = 'overview' | 'settings' | 'docs';

function App() {
  const [printers, setPrinters] = useState<Printer[]>([]);
  const [selectedPrinter, setSelectedPrinter] = useState<Printer | null>(null);
  const [currentView, setCurrentView] = useState<ViewState>('overview');
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const getServerUrl = () => {
    let url = localStorage.getItem('serverUrl') || 'http://127.0.0.1:8080';
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    return url;
  };

  const fetchPrinters = async () => {
    try {
      const url = getServerUrl();
      const data: Printer[] = await invoke("fetch_printers", { serverUrl: url });
      setPrinters(data);
    } catch (error) {
      console.error("Fel vid hämtning av skrivare:", error);
    }
  };

  const handleDeletePrinter = async (id: string) => {
    try {
      const url = getServerUrl();
      await invoke("delete_printer", { serverUrl: url, printerId: id });
      fetchPrinters();
      setSelectedPrinter(null);
    } catch (error) {
      console.error("Kunde inte radera skrivare:", error);
    }
  };

  useEffect(() => {
    fetchPrinters();
  }, []);

  const renderContent = () => {
    if (currentView === 'settings') return <Settings />;
    if (currentView === 'docs') return <Documentation />;

    if (!selectedPrinter) {
      return (
        <main className="dashboard">
          <h1 className="dashboard-header">Fleet Overview</h1>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {printers.map(p => (
              <PrinterCard
                key={p.id}
                printer={p}
                onClick={() => setSelectedPrinter(p)}
              />
            ))}
            {printers.length === 0 && (
              <div style={{ color: 'var(--text-muted)' }}>Inga skrivare tillagda än. Klicka på + i menyn.</div>
            )}
          </div>
        </main>
      );
    }

    return (
      <Dashboard 
        printer={selectedPrinter} 
        onEdit={() => setIsEditModalOpen(true)} 
        onDelete={handleDeletePrinter} 
      />
    );
  };

  return (
    <div className="app-layout">
      <Sidebar
        printers={printers}
        selectedPrinter={selectedPrinter}
        onSelectPrinter={(printer) => {
          setSelectedPrinter(printer);
          setCurrentView('overview');
        }}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        currentView={currentView}
        onChangeView={setCurrentView}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {renderContent()}

      {isAddModalOpen && (
        <AddPrinterModal onClose={() => setIsAddModalOpen(false)} onAdded={fetchPrinters} />
      )}

      {isEditModalOpen && selectedPrinter && (
        <EditPrinterModal 
          printer={selectedPrinter}
          onClose={() => setIsEditModalOpen(false)} 
          onUpdated={(updatedPrinter) => {
            setSelectedPrinter(updatedPrinter);
            fetchPrinters();
          }} 
        />
      )}
    </div>
  );
}

export default App;