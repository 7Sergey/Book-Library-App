import BookForm from "../BookForm/BookForm";
import BookList from "../BookList/BookList";
import Error from "../Error/Error";
import Filter from "../Filter/Filter";
import "./Library.scss";

const Library = () => {
  return (
    <>
      <main className="app-main">
        <div className="app-left-column">
          <BookForm />
        </div>
        <div className="app-right-column">
          <Filter />
          <BookList />
        </div>
      </main>
      <Error />
    </>
  );
};

export default Library;
