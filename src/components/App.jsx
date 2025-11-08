import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import Filter from "./Filter";
import { useLocalStorageReducer } from "../hooks/useLocalStorageReducer";
import { useFilter } from "../hooks/useFilter";

export default function App() {
  const { contacts, addContact, deleteContact } =
    useLocalStorageReducer("contacts");
  const { filter, handleFilterChange, filteredContacts } = useFilter(contacts);

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
