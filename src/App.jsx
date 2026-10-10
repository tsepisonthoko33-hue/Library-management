import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import Transactions from "./pages/Transactions";
import Users from "./pages/Users";
import Login from "./pages/Login";
import { readData, saveData } from "./storage";

const starterUsers = [{
  id: "admin-user", name: "Library Admin", membershipId: "ADMIN001",
  password: "admin123", role: "Admin"
}];

export default function App() {
  const [books, setBooks] = useState(() => readData("library_books", []));
  const [users, setUsers] = useState(() => readData("library_users", starterUsers));
  const [transactions, setTransactions] = useState(() => readData("library_transactions", []));
  const [currentUser, setCurrentUser] = useState(() => readData("library_current_user", null));
  const navigate = useNavigate();

  useEffect(() => saveData("library_books", books), [books]);
  useEffect(() => saveData("library_users", users), [users]);
  useEffect(() => saveData("library_transactions", transactions), [transactions]);
  useEffect(() => saveData("library_current_user", currentUser), [currentUser]);

  function login(user) {
    setCurrentUser(user);
    navigate("/");
  }
  function logout() {
    setCurrentUser(null);
    navigate("/login");
  }

  if (!currentUser) {
    return <Routes><Route path="/login" element={<Login users={users} onLogin={login} />} /><Route path="*" element={<Navigate to="/login" replace />} /></Routes>;
  }

  return (
    <div className="app-shell">
      <Navbar user={currentUser} onLogout={logout} />
      <main className="content">
        <Routes>
          <Route path="/" element={<Dashboard books={books} users={users} transactions={transactions} />} />
          <Route path="/books" element={<Books books={books} setBooks={setBooks} />} />
          <Route path="/transactions" element={<Transactions books={books} setBooks={setBooks} transactions={transactions} setTransactions={setTransactions} user={currentUser} />} />
          <Route path="/users" element={<Users users={users} setUsers={setUsers} currentUser={currentUser} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <footer>Community Library Management System</footer>
      </main>
    </div>
  );
}