import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [newAlert, setNewAlert] = useState(null);

  // Fetch alerts from backend
  const fetchAlerts = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/alerts");
      setAlerts(res.data.alerts);

      // Detect latest ALERT for toast
      const latestAlert = res.data.alerts.find(a => a.level === "ALERT");
      if (latestAlert && latestAlert.id !== (newAlert?.id || 0)) {
        setNewAlert(latestAlert);
        setTimeout(() => setNewAlert(null), 5000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 5000); // refresh every 5s
    return () => clearInterval(interval);
  }, [newAlert]);

  const filteredAlerts = alerts
    .filter(alert => filter === "All" || alert.level === filter)
    .filter(alert =>
      (alert.source + " " + alert.message)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => b.id - a.id); // newest first

  return (
    <div className="app-container">
      <h1>SOC Alerts Dashboard</h1>

      {newAlert && (
        <div className={`toast ${newAlert.level.toLowerCase()}`}>
          ALERT: {newAlert.message}
        </div>
      )}

      <div className="controls">
        <div>
          <label>Show: </label>
          <select value={filter} onChange={e => setFilter(e.target.value)}>
            <option>All</option>
            <option>ALERT</option>
            <option>INFO</option>
          </select>
        </div>
        <div>
          <label>Search: </label>
          <input
            type="text"
            placeholder="Source or Message..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Source</th>
            <th>Message</th>
            <th>Level</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {filteredAlerts.map(alert => (
            <tr
              key={alert.id}
              className={
                alert.level === "ALERT"
                  ? "alert-row"
                  : "info-row"
              }
            >
              <td>{alert.id}</td>
              <td>{alert.source}</td>
              <td>{alert.message}</td>
              <td>{alert.level}</td>
              <td>{alert.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
