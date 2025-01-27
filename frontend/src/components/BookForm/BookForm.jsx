// внешние импорты
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";
// локальные импорты
import {
  addBook,
  addBookApi,
  fetchBook,
  selectIsLoadingViaAPI,
} from "../../redux/slices/booksSlice";
import "./BookForm.scss";
import createBookWithId from "../../utils/createBookWithId";
import { setError } from "../../redux/slices/errorSlice";

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");

  const isLoadingViaAPI = useSelector(selectIsLoadingViaAPI);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && author) {
      const book = createBookWithId(
        {
          //передаем в функцию объект с двумя свойствами
          title: title,
          author: author,
          year: year,
        },
        "manual" //Источник создания книги
      );
      dispatch(addBookApi({ url: "http://localhost:3000/books", book })); // Отправили в базу данных
      // И добавили в состояние
      dispatch(addBook(book)); // вызвав addBook мы получим объект с type и peyload. И этот объект передаем в dispatch
      setAuthor("");
      setTitle("");
      setYear("");
    } else {
      dispatch(setError("Проверьте поля ввода"));
    }
  };

  const handleAddRandomBookViaAPI = async () => {
    dispatch(fetchBook("http://localhost:3000/books/random"));
  };

  return (
    <div className="app-block book-form">
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="year">Year:</label>
          <input
            type="number"
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <button type="submit">Send Book to DB</button>

        <button
          type="button"
          onClick={handleAddRandomBookViaAPI}
          disabled={isLoadingViaAPI} // отключаем кнопку, когда идет загрузка
        >
          {isLoadingViaAPI ? (
            <>
              <span>Loading Book...</span>
              <FaSpinner className="spinner" />
            </>
          ) : (
            "Add Random via API"
          )}
        </button>
      </form>
    </div>
  );
};
export default BookForm;
