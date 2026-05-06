import { useState, useEffect } from 'react';
import './Settings.css';

export default function Settings() {
    const [ip, setIp] = useState(localStorage.getItem('serverUrl') || 'http://127.0.0.1:8080');
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const handleSave = () => {
        localStorage.setItem('serverUrl', ip);
        alert('Inställningar sparade!');
    };

    return (
        <main className="settings-container">
            <div className="settings-wrapper">
                <h1>Inställningar</h1>
                
                <div className="settings-form">
                    <div className="settings-group">
                        <label>Server URL</label>
                        <input 
                            type="text" 
                            value={ip} 
                            onChange={e => setIp(e.target.value)} 
                            placeholder="ex: http://192.168.1.100:8080"
                        />
                        <small>URL:en till backend-servern inklusive portnummer.</small>
                    </div>
                    
                    <div className="settings-group">
                        <label>Applikationstema</label>
                        <select value={theme} onChange={e => setTheme(e.target.value)} className='model-select'>
                            <option value="light">Ljust</option>
                            <option value="dark">Mörkt (Standard)</option>
                            <option value="ocean">Ocean</option>
                            <option value="dracula">Dracula</option>
                        </select>
                    </div>

                    <button className="save-btn" onClick={handleSave}>
                        Spara inställningar
                    </button>
                </div>
            </div>
        </main>
    );
}