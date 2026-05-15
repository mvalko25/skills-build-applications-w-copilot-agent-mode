import React, { useEffect, useState } from 'react';
import { buildApiUrl } from '../api';

function Leaderboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = buildApiUrl('leaderboard');

  const fetchData = () => {
    setLoading(true);
    console.log('Leaderboard endpoint:', endpoint);
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log('Leaderboard fetched data:', data);
        const normalized = Array.isArray(data)
          ? data
          : data?.results || [];
        setItems(normalized);
      })
      .catch((error) => console.error('Leaderboard fetch error:', error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  return (
    <div className="container py-4">
      <div className="card shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="h4 mb-0">Leaderboard</h2>
          <button className="btn btn-primary btn-sm" onClick={fetchData}>
            Refresh
          </button>
        </div>
        <div className="card-body">
          <p className="text-muted">
            Endpoint: <a href={endpoint} className="link-primary">{endpoint}</a>
          </p>
          {loading ? (
            <div className="d-flex align-items-center">
              <div className="spinner-border text-primary me-2" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <span>Loading leaderboard...</span>
            </div>
          ) : items.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-hover table-bordered">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>User</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((entry) => (
                    <tr key={entry.id || entry.pk || entry._id}>
                      <td>{entry.id || entry.pk || entry._id}</td>
                      <td>{entry.user}</td>
                      <td>{entry.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="alert alert-info">No leaderboard entries available.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
