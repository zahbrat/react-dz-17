import { useReducer, useEffect, useCallback } from "react";
import { nanoid } from "nanoid";

const initialContacts = [
  { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
  { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
  { id: "id-3", name: "Eden Clements", number: "645-17-79" },
  { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
];

const getInitialContacts = (key) => {
  const savedContacts = localStorage.getItem(key);
  return savedContacts ? JSON.parse(savedContacts) : initialContacts;
};

const contactsReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "DELETE":
      return state.filter((contact) => contact.id !== action.payload);
    default:
      return state;
  }
};

export const useLocalStorageReducer = (key = "contacts") => {
  const [contacts, dispatch] = useReducer(
    contactsReducer,
    key,
    getInitialContacts
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(contacts));
  }, [contacts, key]);

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

      dispatch({ type: "ADD", payload: newContact });
    },
    [contacts]
  );

  const deleteContact = useCallback((contactId) => {
    dispatch({ type: "DELETE", payload: contactId });
  }, []);

  return {
    contacts,
    addContact,
    deleteContact,
  };
};
