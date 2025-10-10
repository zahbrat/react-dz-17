import { useState } from "react";

export default function ContactForm({ handleSubmit }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "number") {
      setNumber(value);
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit({ name, number });
    setName("");
    setNumber("");
  };

  return (
    <form
      onSubmit={onFormSubmit}
      className="flex flex-col space-y-4 items-stretch flex-1"
      data-name={name}
    >
      <h2 className="text-3xl font-extrabold text-purple-900 text-center">
        Add contact
      </h2>
      <div className="w-full">
        <label
          htmlFor="personName"
          className="block text-lg font-semibold text-purple-700 mb-1"
        >
          Name
        </label>
        <input
          type="text"
          id="personName"
          name="name"
          placeholder="Jane Doe"
          value={name}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Jane Doe"
          required
        />
      </div>

      <div className="w-full">
        <label
          htmlFor="personNumber"
          className="block text-lg font-semibold text-purple-700 mb-1"
        >
          Number
        </label>
        <input
          type="tel"
          id="personNumber"
          name="number"
          placeholder="123-456-789"
          value={number}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-300 transform hover:scale-105"
      >
        Add contact
      </button>
    </form>
  );
}
