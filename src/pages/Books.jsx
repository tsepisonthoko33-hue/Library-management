import { useState } from "react";
import BookForm from "../components/BookForm";

export default function Books({ books, setBooks }) {
  const [selectedBook, setSelectedBook] = useState(null);
  function saveBook(book) {
    if (selectedBook) {
      setBooks(books.map(item => item.id === selectedBook.id ? { ...book, id: item.id } : item));
    } else {
      if (books.some(item => item.isbn.toLowerCase() === book.isbn.toLowerCase())) {
        alert("A book with this ISBN already exists.");
        return;
      }
      setBooks([...books, { ...book, id: crypto.randomUUID() }]);
    }
    setSelectedBook(null);
  }
  function deleteBook(book) {
    if (book.quantity > 0) {
      alert("This book still has copies in stock. Reduce stock to zero before deleting it.");
      return;
    }
    if (window.confirm(`Delete "${book.title}"?`)) {
      setBooks(books.filter(item => item.id !== book.id));
    }
  }
  return (
    <section>
      <div className="page-heading"><div><p className="eyebrow">CATALOGUE</p><h1>Book Management</h1><p>Add, update and remove books.</p></div></div>
      <BookForm selectedBook={selectedBook} onSave={saveBook} onCancel={() => setSelectedBook(null)} />
      <div className="panel">
        <h2>Book List</h2>
        {books.length === 0 ? <p className="empty">No books found. Add a book using the form.</p> : (
          <div className="table-wrap"><table><thead><tr><th>Title</th><th>Author</th><th>Genre</th><th>ISBN</th><th>Quantity</th><th>Actions</th></tr></thead>
            <tbody>{books.map(book => <tr key={book.id}>
              <td>{book.title}</td><td>{book.author}</td><td>{book.genre || "—"}</td><td>{book.isbn}</td><td>{book.quantity}</td>
              <td className="actions"><button className="small" onClick={() => setSelectedBook(book)}>Update</button><button className="small danger" onClick={() => deleteBook(book)}>Delete</button></td>
            </tr>)}</tbody></table></div>
        )}
      </div>
    </section>
  );
}