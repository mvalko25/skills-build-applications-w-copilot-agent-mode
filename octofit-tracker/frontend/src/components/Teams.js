import React, { useEffect, useState } from 'react';

const baseUrl = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

function Teams() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `${baseUrl}/teams/`;

  const fetchData = () => {
    setLoading(true);
    console.log('Teams endpoint:', endpoint);
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log('Teams fetched data:', data);
        const normalized = Array.isArray(data)
          ? data
          : data?.results || [];
        setItems(normalized);
      })
      .catch((error) => console.error('Teams fetch error:', error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  return (
    <div className="container py-4">
      <div className="card shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="h4 mb-0">Teams</h2>
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
              <span>Loading teams...</span>
            </div>
          ) : items.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-hover table-bordered">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((team) => (
                    <tr key={team.id || team.pk || team._id}>
                      <td>{team.id || team.pk || team._id}</td>
                      <td>{team.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="alert alert-info">No teams available.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Teams;
