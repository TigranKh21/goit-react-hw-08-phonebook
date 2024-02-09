import { useDispatch, useSelector } from 'react-redux';
import { apiAddContact } from '../../redux/contactsSlice';

import { getContacts } from '../../redux/selectors';

import css from './Contact.module.css';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const handleSubmit = e => {
    e.preventDefault();
    const name = e.currentTarget.elements.name.value;
    const phone = e.currentTarget.elements.phone.value;

    const formData = {
      name,
      phone,
    };
    const hasDuplicateName = contacts.some(
      contact => contact.name.toLowerCase() === formData.name.toLowerCase()
    );
    if (hasDuplicateName) {
      alert(`The name ${formData.name} is already in contacts`);
      return;
    }

    const hasDuplicateNumber = contacts.some(
      contact => contact.phone === formData.phone
    );
    if (hasDuplicateNumber) {
      alert(`The phone number ${formData.phone} is already in contacts`);
      return;
    }
    dispatch(apiAddContact(formData));
    e.target.reset();
  };

  return (
    <div>
      <form className={css.contactForm} onSubmit={handleSubmit}>
        <label className={css.contactNameLabel}>Name</label>
        <input
          className={css.inputField}
          type="text"
          placeholder="Contact name"
          name="name"
          required
        />
        <label className={css.contactNameLabel}>Number</label>
        <input
          className={css.inputField}
          type="tel"
          placeholder="Phone number"
          name="phone"
          required
        />
        <button type="submit" className={css.contactBtn}>
          Add contact
        </button>
      </form>
    </div>
  );
};
