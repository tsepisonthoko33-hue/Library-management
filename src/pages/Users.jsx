import { useState } from "react";

const blank = { name: "", membershipId: "", role: "Member", password: "" };

export default function Users({ users, setUsers, currentUser }) {
  const [form, setForm] = useState(blank);
  const [editingId, setEditingId] = useState(null);

  function change(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function submit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.membershipId.trim()) return alert("Name and membership ID are required.");
    if (!editingId && !form.password.trim()) return alert("Set a password for the new user.");
    if (users.some(user => user.membershipId.toLowerCase() === form.membershipId.toLowerCase() && user.id !== editingId)) {
      return alert("That membership ID is already in use.");
    }
    if (editingId) {
      setUsers(users.map(user => user.id === editingId ? { ...user, name: form.name.trim(), membershipId: form.membershipId.trim(), role: form.role, ...(form.password ? { password: form.password } : {}) } : user));
    } else {
      setUsers([...users, { ...form, id: crypto.randomUUID(), name: form.name.trim(), membershipId: form.membershipId.trim() }]);
    }
    setForm(blank);
    setEditingId(null);
  }
  function edit(user) {
    setEditingId(user.id);
    setForm({ name: user.name, membershipId: user.membershipId, role: user.role, password: "" });
  }
  function remove(user) {
    if (user.id === currentUser.id) return alert("You cannot delete the account currently in use.");
    if (window.confirm(`Delete ${user.name}?`)) setUsers(users.filter(item => item.id !== user.id));
  }

  return (
    <section>
      <div className="page-heading"><div><p className="eyebrow">MEMBERS</p><h1>User Management</h1><p>Manage library members and librarian accounts.</p></div></div>
      {currentUser.role === "Admin" ? <>
        <form className="panel form-grid" onSubmit={submit}>
          <h2>{editingId ? "Update User" : "Add New User"}</h2>
          <label>Full Name<input name="name" value={form.name} onChange={change} required /></label>
          <label>Membership ID<input name="membershipId" value={form.membershipId} onChange={change} required /></label>
          <label>Role<select name="role" value={form.role} onChange={change}><option>Member</option><option>Librarian</option><option>Admin</option></select></label>
          <label>Password{editingId && <span className="hint"> (leave blank to keep current)</span>}<input name="password" type="password" value={form.password} onChange={change} required={!editingId} /></label>
          <div className="form-actions"><button type="submit">{editingId ? "Save Changes" : "Add User"}</button>{editingId && <button type="button" className="secondary" onClick={() => { setEditingId(null); setForm(blank); }}>Cancel</button>}</div>
        </form>
        <div className="panel"><h2>Registered Users</h2><div className="table-wrap"><table><thead><tr><th>Name</th><th>Membership ID</th><th>Role</th><th>Actions</th></tr></thead>
          <tbody>{users.map(user => <tr key={user.id}><td>{user.name}</td><td>{user.membershipId}</td><td>{user.role}</td><td className="actions"><button className="small" onClick={() => edit(user)}>Update</button><button className="small danger" onClick={() => remove(user)}>Delete</button></td></tr>)}</tbody></table></div></div>
      </> : <div className="panel"><h2>Account Details</h2><p><strong>Name:</strong> {currentUser.name}</p><p><strong>Membership ID:</strong> {currentUser.membershipId}</p><p><strong>Role:</strong> {currentUser.role}</p><p className="hint">Only Admin accounts can add, update or delete users.</p></div>}
    </section>
  );
}