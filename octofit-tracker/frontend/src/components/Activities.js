import React, { useEffect, useState } from 'react';
import { getCodespaceName } from '../api';

function Activities() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const codespaceName = getCodespaceName() || 'codespace';
  const endpoint = `https://${codespaceName}-8000.app.github.dev/api/activities/`;

  const fetchData = () => {
    setLoading(true);
    console.log('Activities endpoint:', endpoint);
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log('Activities fetched data:', data);
        const normalized = Array.isArray(data)
          ? data
          : data?.results || [];
        setItems(normalized);
      })
      .catch((error) => console.error('Activities fetch error:', error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  return (
    <div className="container py-4">
      <div className="card shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="h4 mb-0">Activities</h2>
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
              <span>Loading activities...</span>
            </div>
          ) : items.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-hover table-bordered">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Type</th>
                    <th>User</th>
                    <th>Duration</th>
                    <th>Distance</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((activity) => (
                    <tr key={activity.id || activity.pk || activity._id}>
                      <td>{activity.id || activity.pk || activity._id}</td>
                      <td>{activity.type}</td>
                      <td>{activity.user}</td>
                      <td>{activity.duration}</td>
                      <td>{activity.distance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="alert alert-info">No activities available.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Activities;
