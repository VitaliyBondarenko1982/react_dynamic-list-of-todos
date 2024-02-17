import {
  Dispatch, SetStateAction, ChangeEvent, FC,
} from 'react';
import { ActiveFilter } from '../../types/ActiveFilter';

const options = [ActiveFilter.All, ActiveFilter.Active, ActiveFilter.Completed];

interface Props {
  activeFilter: ActiveFilter;
  setActiveFilter: Dispatch<SetStateAction<ActiveFilter>>;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}

export const TodoFilter: FC<Props> = ({
  activeFilter, setActiveFilter, query, setQuery,
}) => {
  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setActiveFilter(event.target.value as ActiveFilter);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const deleteQuery = () => setQuery('');

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={activeFilter}
            onChange={handleSelect}
          >
            {options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={handleChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="delete"
              onClick={deleteQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
