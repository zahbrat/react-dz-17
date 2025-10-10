import { useState, useEffect, useMemo, useCallback } from "react";
import { nanoid } from "nanoid";

import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import Filter from "./Filter";

const initialContacts = [
  { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
  { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
  { id: "id-3", name: "Eden Clements", number: "645-17-79" },
  { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
];

const getInitialContacts = () => {
  const savedContacts = localStorage.getItem("contacts");
  return savedContacts ? JSON.parse(savedContacts) : initialContacts;
};

export default function App() {
  const [contacts, setContacts] = useState(getInitialContacts);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = useCallback(
    ({ name, number }) => {
      const isNameInContacts = contacts.some(
        (contact) => contact.name.toUpperCase() === name.toUpperCase()
      );

      if (isNameInContacts) {
        alert(`${name} is already in contacts`);
        return;
      }

      const newContact = {
        id: nanoid(),
        name,
        number,
      };

      setContacts((prevContacts) => [...prevContacts, newContact]);
    },
    [contacts]
  );

  const deleteContact = useCallback((contactId) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== contactId)
    );
  }, []);

  const handleFilterChange = useCallback((e) => {
    setFilter(e.target.value);
  }, []);

  const filteredContacts = useMemo(() => {
    const normalizedFilter = filter.toUpperCase();
    return contacts.filter((contact) =>
      contact.name.toUpperCase().includes(normalizedFilter)
    );
  }, [contacts, filter]);

  return (
    <section className="min-h-screen bg-purple-100 p-8 flex flex-col items-center justify-center select-none">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-5xl space-y-8">
        <h1 className="text-4xl font-extrabold text-purple-900 text-center">
          Phonebook
        </h1>

        <div className="flex w-full gap-10">
          <div className="space-y-8 flex-1">
            <ContactForm handleSubmit={addContact} />
            <Filter filter={filter} handleChange={handleFilterChange} />
          </div>

          <div className="space-y-4 flex-1">
            <h2 className="text-3xl font-extrabold text-purple-900 text-center">
              Contacts
            </h2>
            <ContactList
              contacts={filteredContacts}
              deleteContact={deleteContact}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
