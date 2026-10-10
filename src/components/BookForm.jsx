import { useEffect, useState } from "react";

const blankBook = { title: "", author: "", genre: "", isbn: "", quantity: 1 };

export default function BookForm({ selectedBook, onSave, onCancel }) {
  const [form, setForm] = useState(blankBook);

  useEffect(() => {
    setForm(selectedBook || blankBook);
  }, [selectedBook]);

  function change(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function submit(event) {
    event.preventDefault();
    if (!form.title.trim() || !form.author.trim() || !form.isbn.trim()) {
      alert("Title, author and ISBN are required.");
      return;
    }
    const quantity = Number(form.quantity);
    if (!Number.isInteger(quantity) || quantity < 0) {
      alert("Quantity must be a whole number of 0 or more.");
      return;
    }
    onSave({ ...form, title: form.title.trim(), author: form.author.trim(),
      genre: form.genre.trim(), isbn: form.isbn.trim(), quantity });
    setForm(blankBook);
  }

  return (
    <form className="panel form-grid" onSubmit={submit}>
      <h2>{selectedBook ? "Update Book" : "Add New Book"}</h2>
      <label>Title<input name="title" value={form.title} onChange={change} required /></label>
      <label>Author<input name="author" value={form.author} onChange={change} required /></label>
      <label>Genre<input name="genre" value={form.genre} onChange={change} /></label>
      <label>ISBN<input name="isbn" value={form.isbn} onChange={change} required /></label>
      <label>Initial Quantity<input name="quantity" type="number" min="0" value={form.quantity} onChange={change} required /></label>
      <div className="form-actions">
        <button type="submit">{selectedBook ? "Save Changes" : "Add Book"}</button>
        {selectedBook && <button type="button" className="secondary" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}