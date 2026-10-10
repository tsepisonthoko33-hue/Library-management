import { useState } from "react";

export default function Transactions({ books, setBooks, transactions, setTransactions, user }) {
  const [bookId, setBookId] = useState("");
  const [type, setType] = useState("Add stock");
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");

  function submit(event) {
    event.preventDefault();
    const amount = Number(quantity);
    const book = books.find(item => item.id === bookId);
    if (!book) return alert("Please select a book.");
    if (!Number.isInteger(amount) || amount < 1) return alert("Quantity must be at least 1.");
    if (type === "Borrow" && amount > book.quantity) return alert("There are not enough copies in stock.");
    const newQuantity = type === "Add stock" ? book.quantity + amount : book.quantity - amount;
    setBooks(books.map(item => item.id === book.id ? { ...item, quantity: newQuantity } : item));
    setTransactions([{
      id: crypto.randomUUID(), bookTitle: book.title, type, quantity: amount,
      note: note.trim(), user: user.name, date: new Date().toLocaleString()
    }, ...transactions]);
    setQuantity(1);
    setNote("");
  }

  return (
    <section>
      <div className="page-heading"><div><p className="eyebrow">STOCK CONTROL</p><h1>Transactions</h1><p>Record new stock and borrowed books.</p></div></div>
      <form className="panel form-grid" onSubmit={submit}>
        <h2>Record Transaction</h2>
        <label>Book<select value={bookId} onChange={e => setBookId(e.target.value)} required><option value="">Choose a book</option>{books.map(book => <option key={book.id} value={book.id}>{book.title} ({book.quantity} available)</option>)}</select></label>
        <label>Transaction<select value={type} onChange={e => setType(e.target.value)}><option>Add stock</option><option>Borrow</option></select></label>
        <label>Quantity<input type="number" min="1" value={quantity} onChange={e => setQuantity(e.target.value)} required /></label>
        <label>Note (optional)<input value={note} onChange={e => setNote(e.target.value)} placeholder="e.g. New delivery" /></label>
        <div className="form-actions"><button type="submit">Save Transaction</button></div>
      </form>
      <div className="panel"><h2>Transaction History</h2>
        {transactions.length === 0 ? <p className="empty">No transactions recorded yet.</p> : <div className="table-wrap"><table><thead><tr><th>Date</th><th>Book</th><th>Type</th><th>Quantity</th><th>Recorded by</th><th>Note</th></tr></thead>
          <tbody>{transactions.map(item => <tr key={item.id}><td>{item.date}</td><td>{item.bookTitle}</td><td>{item.type}</td><td>{item.quantity}</td><td>{item.user}</td><td>{item.note || "—"}</td></tr>)}</tbody></table></div>}
      </div>
    </section>
  );
}