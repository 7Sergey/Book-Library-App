import { useDispatch, useSelector } from "react-redux";
import { deleteBook } from "../../redux/books/actionCreators";
import "./BookList.css";

const BookList = () => {
  async function fetchBooks() {
    try {
      const response = await fetch(
        "https://stephen-king-api.onrender.com/api/books"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Ошибка при получении списка книг:", error);
    }
  }

  async function logBooks() {
    const stivenBiikList = await fetchBooks();
    stivenBiikList;
  }

  const books = useSelector((state) => state.books);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteBook(id));
  };

  return (
    <div className="app-block book-list">
      <h2>Book List</h2>
      {books.length === 0 ? (
        <p>No books available</p>
      ) : (
        <ul>
          {books.map((book, i) => (
            <li key={book.id}>
              <div className="book-info">
                {++i}. {book.title} by <strong>{book.author}</strong>{" "}
              </div>
              <div className="book-actions">
                <button
                  onClick={() => {
                    handleDelete(book.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;
