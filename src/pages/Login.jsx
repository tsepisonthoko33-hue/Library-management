import { useState } from "react";

export default function Login({ users, onLogin }) {
  const [membershipId, setMembershipId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function submit(e) {
    e.preventDefault();
    const user = users.find(item => item.membershipId.toLowerCase() === membershipId.trim().toLowerCase() && item.password === password);
    if (!user) {
      setError("Incorrect membership ID or password.");
      return;
    }
    setError("");
    onLogin(user);
  }

  return (
    <main className="login-screen">
      <form className="login-card" onSubmit={submit}>
        <div className="login-mark">CL</div>
        <p className="eyebrow">WELCOME BACK</p>
        <h1>Community Library</h1>
        <p>Sign in to manage library records.</p>
        {error && <p className="error">{error}</p>}
        <label>Membership ID<input value={membershipId} onChange={e => setMembershipId(e.target.value)} required /></label>
        <label>Password<input type="password" value={password} onChange={e => setPassword(e.target.value)} required /></label>
        <button type="submit" className="full">Login</button>
        <p className="hint">Demo Admin: ADMIN001 / admin123</p>
      </form>
    </main>
  );
}