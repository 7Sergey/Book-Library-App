import { useDispatch, useSelector } from "react-redux";
import {
  selectTitleFilter,
  setTitleFilter,
  resetFilters,
} from "../../redux/slices/filterSlice";
import "./Filter.css";

const Filter = () => {
  const dispatch = useDispatch();
  const titleFilter = useSelector(selectTitleFilter);

  const handleTitleFilterChange = (e) => {
    dispatch(setTitleFilter(e.target.value));
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
          <button onClick={handleResetFilters}>Reset Filters</button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
