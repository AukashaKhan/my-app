import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";

const sidebarStyle = {
  width: "200px",
  background: "#282c34",
  color: "white",
  height: "100vh",
  padding: "1rem",
  boxSizing: "border-box",
  position: "fixed",
  top: 0,
  left: 0,
};

const navStyle = {
  height: "60px",
  background: "#61dafb",
  paddingLeft: "220px",
  display: "flex",
  alignItems: "center",
  paddingRight: "1rem",
  justifyContent: "space-between",
  boxSizing: "border-box",
};

const mainStyle = {
  marginLeft: "220px",
  padding: "1rem",
  fontFamily: "'Arial', sans-serif",
};

const activeLinkStyle = {
  color: "#61dafb",
  fontWeight: "bold",
};

function Navbar() {
  const location = useLocation();

  return (
    <div style={navStyle}>
      <h2>My React App</h2>
      <div>
        <Link
          to="/"
          style={location.pathname === "/" ? activeLinkStyle : { marginRight: 20 }}
        >
          Users
        </Link>
        <Link
          to="/posts"
          style={location.pathname === "/posts" ? activeLinkStyle : { marginRight: 20 }}
        >
          Posts
        </Link>
        <Link
          to="/todos"
          style={location.pathname === "/todos" ? activeLinkStyle : {}}
        >
          Todos
        </Link>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div style={sidebarStyle}>
      <h3>Menu</h3>
      <nav>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li><Link to="/" style={{ color: "white", textDecoration: "none" }}>Users</Link></li>
          <li><Link to="/posts" style={{ color: "white", textDecoration: "none" }}>Posts</Link></li>
          <li><Link to="/todos" style={{ color: "white", textDecoration: "none" }}>Todos</Link></li>
        </ul>
      </nav>
    </div>
  );
}

function DataGrid({ data, renderItem }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "1.5rem",
      }}
    >
      {data.map(renderItem)}
    </div>
  );
}

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load users");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <DataGrid
      data={users}
      renderItem={user => (
        <div key={user.id} style={cardStyle}>
          <h3>{user.name}</h3>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Website:</strong> <a href={`http://${user.website}`} target="_blank" rel="noreferrer">{user.website}</a></p>
          <p><strong>Company:</strong> {user.company.name}</p>
          <p><strong>Address:</strong> {user.address.suite}, {user.address.street}, {user.address.city} - {user.address.zipcode}</p>
        </div>
      )}
    />
  );
}

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=12")
      .then(res => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load posts");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <DataGrid
      data={posts}
      renderItem={post => (
        <div key={post.id} style={cardStyle}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      )}
    />
  );
}

function Todos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=12")
      .then(res => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then(data => {
        setTodos(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load todos");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading todos...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <DataGrid
      data={todos}
      renderItem={todo => (
        <div key={todo.id} style={cardStyle}>
          <h3>{todo.title}</h3>
          <p>Status: {todo.completed ? "✅ Completed" : "❌ Not completed"}</p>
        </div>
      )}
    />
  );
}

const cardStyle = {
  border: "1px solid #ccc",
  borderRadius: "8px",
  padding: "1rem",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  backgroundColor: "#f9f9f9",
};

export default function App() {
  return (
    <Router>
      <Sidebar />
      <Navbar />
      <main style={mainStyle}>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/todos" element={<Todos />} />
        </Routes>
      </main>
    </Router>
  );
}
