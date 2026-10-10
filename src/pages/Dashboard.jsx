export default function Dashboard({ books, users, transactions }) {
  const totalCopies = books.reduce((sum, book) => sum + Number(book.quantity), 0);
  return (
    <section>
      <div className="page-heading"><div><p className="eyebrow">OVERVIEW</p><h1>Library Dashboard</h1><p>Check books and library activity.</p></div></div>
      <div className="stats">
        <article className="stat-card"><span>Book titles</span><strong>{books.length}</strong></article>
        <article className="stat-card"><span>Copies in stock</span><strong>{totalCopies}</strong></article>
        <article className="stat-card"><span>Registered users</span><strong>{users.length}</strong></article>
        <article className="stat-card"><span>Transactions</span><strong>{transactions.length}</strong></article>
      </div>
      <div className="panel">
        <h2>Current Book Availability</h2>
        {books.length === 0 ? <p className="empty">No books have been added yet.</p> : (
          <div className="table-wrap"><table><thead><tr><th>Title</th><th>Author</th><th>Genre</th><th>ISBN</th><th>Copies</th><th>Status</th></tr></thead>
            <tbody>{books.map(book => <tr key={book.id} className={book.quantity < 2 ? "low-stock" : ""}>
              <td>{book.title}</td><td>{book.author}</td><td>{book.genre || "—"}</td><td>{book.isbn}</td><td>{book.quantity}</td>
              <td><span className={book.quantity < 2 ? "pill warning" : "pill success"}>{book.quantity < 2 ? "Low stock" : "Available"}</span></td>
            </tr>)}</tbody></table></div>
        )}
      </div>
    </section>
  );
}