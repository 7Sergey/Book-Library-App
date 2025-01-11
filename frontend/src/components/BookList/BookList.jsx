import { BsBookmarkCheck } from "react-icons/bs";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

import { deleteBook, toggleFavorite } from "../../redux/books/actionCreators";
import {
  selectAuthorFilter,
  selectTitleFilter,
} from "../../redux/slices/filterSlice";
import "./BookList.css";

const BookList = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books);
  const titleFilter = useSelector(selectTitleFilter);
  const authorFilter = useSelector(selectAuthorFilter);

  const handleDelete = (id) => {
    dispatch(deleteBook(id));
  };

  const handleToggle = (id) => {
    dispatch(toggleFavorite(id));
  };

  const filtredBooks = books.filter((book) => {
    //Преобразовал к нижнему регистру название книги, сравнил её с фильтром пользователя.
    const matchesTitle = book.title
      .toLowerCase()
      .includes(titleFilter.toLowerCase());

    const matcheAuthor = book.author
      .toLowerCase()
      .includes(authorFilter.toLowerCase());

    return matchesTitle && matcheAuthor;
  });
  return (
    <div className="app-block book-list">
      <h2>Book List</h2>
      {filtredBooks.length === 0 ? (
        <p>No books available</p>
      ) : (
        <ul>
          {filtredBooks.map((book, i) => (
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
