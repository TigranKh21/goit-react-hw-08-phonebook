import { useDispatch, useSelector } from 'react-redux';
import { filterContact } from '../../redux/contactsSlice';

import css from './Contact.module.css';
import { getFiltering } from '../../redux/selectors';

export const Filter = () => {
  const dispatch = useDispatch();
  const filterData = useSelector(getFiltering);

  const handleFindChange = e => {
    const value = e.target.value;
    dispatch(filterContact(value));
  };

  return (
    <div className={css.contactForm}>
      <label className={css.contactNameLabel}>Find contact by name</label>
      <input
        className={css.inputField}
        type="text"
        placeholder="search..."
        name="filter"
        value={filterData}
        onChange={handleFindChange}
      />
    </div>
  );
};
