// внешние импорты
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";
// локальные импорты
import {
  addBook,
  fetchBook,
  selectIsLoadingViaAPI,
} from "../../redux/slices/booksSlice";
import "./BookForm.scss";
import createBookWithId from "../../utils/createBookWithId";
import { setError } from "../../redux/slices/errorSlice";

const BookForm = () => {
  const [booksFromMongo, setBooksFromMongo] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:4000/books");
        if (!response.ok) throw new Error("Ошибка загрузки книг");
        const data = await response.json();
        setBooksFromMongo(data);
        console.log(data);
      } catch (err) {
        console.error(err);
        err.message;
      }
    };

    fetchBooks();
  }, []); // Пустой массив зависимостей - загрузка только при монтировании компонента

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const isLoadingViaAPI = useSelector(selectIsLoadingViaAPI);
  const dispatch = useDispatch();

  const handleAddRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * booksFromMongo.length);
    const randomBook = booksFromMongo[randomIndex];

    dispatch(addBook(createBookWithId(randomBook, "random")));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && author) {
      const book = createBookWithId(
        {
          //передаем в функцию объект с двумя свойствами
          title: title,
          author: author,
        },
        "manual" //Источник создания книги
      );

      dispatch(addBook(book)); // вызвав addBook мы получим объект с type и peyload. И этот объект передаем в dispatch

      setAuthor("");
      setTitle("");
    } else {
      dispatch(setError("Проверьте поля ввода"));
    }
  };

  const handleAddRandomBookViaAPI = async () => {
    dispatch(fetchBook("http://localhost:4000/random-book-delayed"));
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
        <button type="submit">Add Book</button>
        <button type="button" onClick={handleAddRandomBook}>
          Add Random
        </button>

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
