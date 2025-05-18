import React, { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch user data. Please try again later.");
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', maxWidth: '900px', margin: 'auto' }}>
      <h1 style={{ textAlign: 'center' }}>Users List</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '1.5rem' 
          }}
        >
          {users.map(user => (
            <div key={user.id} style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '1rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              backgroundColor: '#f9f9f9',
            }}>
              <h2 style={{ marginTop: 0 }}>{user.name}</h2>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> <a href={`mailto:${user.email}`}>{user.email}</a></p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>Website:</strong> <a href={`http://${user.website}`} target="_blank" rel="noreferrer">{user.website}</a></p>
              <p><strong>Company:</strong> {user.company.name}</p>
              <p><strong>Address:</strong> {user.address.suite}, {user.address.street}, {user.address.city} - {user.address.zipcode}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
