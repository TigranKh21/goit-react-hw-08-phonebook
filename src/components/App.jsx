import { ContactForm } from './Contacts/ContactForm.jsx';
import { ContactList } from './Contacts/ContactList.jsx';
import { Filter } from './Contacts/Filter.jsx';

export const App = () => {
  return (
    <div>
      <h2>Phonebook</h2>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
      <ContactList />
    </div>
  );
};
