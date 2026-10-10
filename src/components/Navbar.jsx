import { NavLink } from "react-router-dom";

export default function Navbar({ user, onLogout }) {
  return (
    <header className="topbar">
      <div className="brand">Community Library</div>
      <nav>
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/books">Books</NavLink>
        <NavLink to="/transactions">Transactions</NavLink>
        <NavLink to="/users">Users</NavLink>
      </nav>
      <div className="account">
        <span>{user.name}</span>
        <button className="small secondary" onClick={onLogout}>Logout</button>
      </div>
    </header>
  );
}