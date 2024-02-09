import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { apiDeleteContact, apiGetContacts } from '../../redux/contactsSlice';
import { getContacts, getFiltering, getStatus } from '../../redux/selectors';

import css from './Contact.module.css';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filterData = useSelector(getFiltering);
  const status = useSelector(getStatus);

  useEffect(() => {
    dispatch(apiGetContacts());
  }, [dispatch]);

  const searchData = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filterData.toLowerCase())
  );

  const handleDeleteContact = id => {
    dispatch(apiDeleteContact(id));
  };

  if (status === 'pending') {
    return <div>Loading...</div>;
  }
  return (
    <ul className={css.contactsList}>
      {searchData.map(contact => (
        <li key={contact.id} className={css.contact}>
          {contact.name}: {contact.phone}
          <button
            className={css.deleteContactBtn}
            onClick={() => handleDeleteContact(contact.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
