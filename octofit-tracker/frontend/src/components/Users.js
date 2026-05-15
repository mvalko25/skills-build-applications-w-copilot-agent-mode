import React, { useEffect, useState } from 'react';
import { buildApiUrl } from '../api';

function Users() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = buildApiUrl('users');

  const fetchData = () => {
    setLoading(true);
    console.log('Users endpoint:', endpoint);
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log('Users fetched data:', data);
        const normalized = Array.isArray(data)
          ? data
          : data?.results || [];
        setItems(normalized);
      })
      .catch((error) => console.error('Users fetch error:', error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  return (
    <div className="container py-4">
      <div className="card shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="h4 mb-0">Users</h2>
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
              <span>Loading users...</span>
            </div>
          ) : items.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-hover table-bordered">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Team</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((user) => (
                    <tr key={user.id || user.pk || user._id}>
                      <td>{user.id || user.pk || user._id}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.team || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="alert alert-info">No users available.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Users;
