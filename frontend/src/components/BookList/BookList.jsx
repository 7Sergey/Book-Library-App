import { BsBookmarkCheck } from "react-icons/bs";
import { BsBookmarkCheckFill } from "react-icons/bs";

import { useDispatch, useSelector } from "react-redux";
import { deleteBook, toggleFavorite } from "../../redux/books/actionCreators";
import "./BookList.css";

const BookList = () => {
  const books = useSelector((state) => state.books);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteBook(id));
  };

  const handleToggle = (id) => {
    dispatch(toggleFavorite(id));
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
                {book.isFavorite ? (
                  <BsBookmarkCheckFill
                    onClick={() => {
                      handleToggle(book.id);
                    }}
                    className="star-icon"
                  />
                ) : (
                  <BsBookmarkCheck
                    onClick={() => {
                      handleToggle(book.id);
                    }}
                    className="star-icon"
                  />
                )}
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
