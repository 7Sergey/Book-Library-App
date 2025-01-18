import { useDispatch, useSelector } from "react-redux";
import {
  selectTitleFilter,
  setTitleFilter,
  resetFilters,
  selectAuthorFilter,
  setAuthorFilter,
  selectFavoriteFilter,
  setFavoriteFilter,
} from "../../redux/slices/filterSlice";
import "./Filter.scss";

const Filter = () => {
  const dispatch = useDispatch();
  const titleFilter = useSelector(selectTitleFilter);
  const authorFilter = useSelector(selectAuthorFilter);
  const favoriteFilter = useSelector(selectFavoriteFilter);

  const handleTitleFilterChange = (e) => {
    dispatch(setTitleFilter(e.target.value));
  };

  const handleAuthorFilterChange = (e) => {
    dispatch(setAuthorFilter(e.target.value));
  };

  const handleFavoriteFilterChange = (e) => {
    dispatch(setFavoriteFilter(e.target.checked));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };
  return (
    <div className="app-block filter">
      <div className="filter-row">
        <div className="filter-group">
          <input
            type="text"
            placeholder="Filter by title..."
            onChange={handleTitleFilterChange}
            value={titleFilter}
          />
        </div>
        <div className="filter-group">
          <input
            type="text"
            placeholder="Filter by author..."
            onChange={handleAuthorFilterChange}
            value={authorFilter}
          />
        </div>
        <div className="filter-group">
          <label htmlFor="favorites">
            <input
              type="checkbox"
              id="favorites"
              name="favorites"
              checked={favoriteFilter}
              onChange={handleFavoriteFilterChange}
            ></input>
            Only Favorite
          </label>
        </div>
        <button onClick={handleResetFilters}>Reset Filters</button>
      </div>
    </div>
  );
};

export default Filter;
