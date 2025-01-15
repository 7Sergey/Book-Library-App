// внешние импорты
import { useState } from "react";
import { useDispatch } from "react-redux";
// локальные импорты
import booksData from "../../data/books.json";
import { addBook, fetchBook } from "../../redux/slices/booksSlice";
import "./BookForm.css";
import createBookWithId from "../../utils/createBookWithId";
import { setError } from "../../redux/slices/errorSlice";

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const dispatch = useDispatch();

  const handleAddRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * booksData.length);
    const randomBook = booksData[randomIndex];

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
    dispatch(fetchBook("http://localhost:4000/random-book"));
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
        <button type="button" onClick={handleAddRandomBookViaAPI}>
          Add Random via API
        </button>
      </form>
    </div>
  );
};
export default BookForm;
