import { BsBookmarkCheck } from "react-icons/bs";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteBook,
  selectBooks,
  toggleFavorite,
} from "../../redux/slices/booksSlice";
import {
  selectAuthorFilter,
  selectFavoriteFilter,
  selectTitleFilter,
} from "../../redux/slices/filterSlice";
import "./BookList.scss";
import { selectUser } from "../../redux/slices/userSlice";

const BookList = () => {
  const dispatch = useDispatch();
  const books = useSelector(selectBooks);
  const titleFilter = useSelector(selectTitleFilter);
  const authorFilter = useSelector(selectAuthorFilter);
  const favoriteFilter = useSelector(selectFavoriteFilter);
  const userName = useSelector(selectUser);

  //удаление книги
  const handleDelete = (id) => {
    dispatch(deleteBook(id));
  };

  //переключение избранных книг
  const handleToggle = (id) => {
    dispatch(toggleFavorite(id));
  };

  //фильтрация книг
  const filtredBooks = books.filter((book) => {
    //Преобразовал к нижнему регистру название книги, сравнил её с фильтром по названию книги.
    const matchesTitle = book.title
      .toLowerCase()
      .includes(titleFilter.toLowerCase());

    //Преобразовал к нижнему регистру автора книги, сравнил её с фильтром по автору.
    const matchesAuthor = book.author
      .toLowerCase()
      .includes(authorFilter.toLowerCase());

    const matchesFavorite = favoriteFilter ? book.isFavorite : true;

    return matchesTitle && matchesAuthor && matchesFavorite;
  });

  const highlightMatch = (text, filter) => {
    if (!filter) return text;

    const regex = new RegExp(`(${filter})`, "gi");

    return text.split(regex).map((substring, i) => {
      if (substring.toLowerCase() === filter.toLowerCase()) {
        return (
          <span key={i} className="highlight">
            {substring}
          </span>
        );
      }
      return substring;
    });
  };

  return (
    <div className="app-block book-list">
      <h2>{`Book List by ${userName}`}</h2>
      {filtredBooks.length === 0 ? (
        <p>No books available</p>
      ) : (
        <ul>
          {filtredBooks.map((book, i) => (
            <li key={book.id || book._id || i}>
              <div className="book-info">
                {++i}. {highlightMatch(book.title, titleFilter)} by{" "}
                <strong>{highlightMatch(book.author, authorFilter)}</strong> (
                {book.source})
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
