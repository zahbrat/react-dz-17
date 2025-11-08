import { useState, useCallback, useMemo } from "react";

export const useFilter = (contacts) => {
  const [filter, setFilter] = useState("");

  const handleFilterChange = useCallback((e) => {
    setFilter(e.target.value);
  }, []);

  const filteredContacts = useMemo(() => {
    const normalizedFilter = filter.toUpperCase();
    return contacts.filter((contact) =>
      contact.name.toUpperCase().includes(normalizedFilter)
    );
  }, [contacts, filter]);

  return {
    filter,
    handleFilterChange,
    filteredContacts,
  };
};
