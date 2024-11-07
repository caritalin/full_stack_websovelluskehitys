import React, { useState, useEffect } from 'react';
import axios from 'axios';
import personService from './services/personService';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import './App.css';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState({ message: null, type: null });

  useEffect(() => {
    // Haetaan alkutila palvelimelta
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setFilter(event.target.value);

  const addPerson = (event) => {
    event.preventDefault();
    const personExists = persons.find((person) => person.name === newName);

    // Check if person exists, update their number if so
    if (personExists) {
      const confirmUpdate = window.confirm(
        `${newName} is already in the phonebook. Do you want to replace their old number with the new one?`
      );
      if (confirmUpdate) {
        const updatedPerson = { ...personExists, number: newNumber };
        personService
          .update(personExists.id, updatedPerson)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id !== personExists.id ? person : response.data
              )
            );
            setNewName('');
            setNewNumber('');
            setNotification({
              message: `${newName}'s number was updated successfully.`,
              type: 'success',
            });
            setTimeout(() => {
              setNotification({ message: null, type: null });
            }, 5000);
          })
          .catch((error) => {
            setNotification({
              message: `Error updating ${newName}: ${error.response.data.error}`,
              type: 'error',
            });
            setTimeout(() => {
              setNotification({ message: null, type: null });
            }, 5000);
          });
      }
    } else {
      // Generate a new ID by finding the max ID and adding 1
      const newId = (Math.max(...persons.map((person) => parseInt(person.id))) + 1).toString();

      const newPerson = { id: newId, name: newName, number: newNumber };
      personService
        .create(newPerson)
        .then((response) => {
          setPersons(persons.concat(response.data));
          setNewName('');
          setNewNumber('');
          setNotification({
            message: `${newName} was added to the phonebook.`,
            type: 'success',
          });
          setTimeout(() => {
            setNotification({ message: null, type: null });
          }, 5000);
        })
        .catch((error) => {
          setNotification({
            message: `Error adding ${newName}: ${error.response.data.error}`,
            type: 'error',
          });
          setTimeout(() => {
            setNotification({ message: null, type: null });
          }, 5000);
        });
    }
  };

  const deletePerson = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${personToDelete.name}?`
    );

    if (confirmDelete) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setNotification({
            message: `${personToDelete.name} was deleted from the phonebook.`,
            type: 'success',
          });
          setTimeout(() => {
            setNotification({ message: null, type: null });
          }, 5000);
        })
        .catch((error) => {
          setNotification({
            message: `Error deleting ${personToDelete.name}: ${error.response.data.error}`,
            type: 'error',
          });
          setTimeout(() => {
            setNotification({ message: null, type: null });
          }, 5000);
        });
    }
  };

  // Safely filter persons, checking for undefined or missing 'name' property
  const filteredPersons = persons.filter(
    (person) => person && person.name && person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      {notification.message && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
      <Filter value={filter} onChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        name={newName}
        number={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;