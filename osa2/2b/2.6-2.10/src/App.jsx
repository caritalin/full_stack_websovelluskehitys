import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1231244' }
  ]); 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  // Handler for form submission
  const addPerson = (event) => {
    event.preventDefault(); // Prevent page reload

    // Check if the name already exists in the phonebook
    const nameExists = persons.some(person => person.name === newName);
    if (nameExists) {
      alert(`${newName} is already added to phonebook`);
      return; // Stop the function if name exists
    }

    const personObject = { name: newName, number: newNumber };

    setPersons(persons.concat(personObject)); // Add new person to the list
    setNewName(''); // Clear the name input field after submission
    setNewNumber(''); // Clear the number input field after submission
  };

  // Handlers for input changes
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <ul>
        {persons.map(person => (
          <li key={person.name}>{person.name} {person.number}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
