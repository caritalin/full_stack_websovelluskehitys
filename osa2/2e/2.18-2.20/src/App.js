import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CountryApp = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    if (search.length > 0) {
      axios
        .get(`https://restcountries.com/v3.1/name/${search}`)
        .then((response) => {
          console.log(response.data); // Log response to inspect the data
          setCountries(response.data);
        })
        .catch((error) => {
          console.error("Error fetching countries: ", error);
        });
    }
  }, [search]);

  useEffect(() => {
    if (countries.length > 0) {
      setFilteredCountries(countries);
    }
  }, [countries]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleShowDetails = (country) => {
    setFilteredCountries([country]);
  };

  return (
    <div>
      <h1>Country Information</h1>
      <input
        type="text"
        placeholder="Search for a country"
        value={search}
        onChange={handleSearchChange}
      />
      <div>
        {filteredCountries.length > 10 ? (
          <p>Too many results, please be more specific.</p>
        ) : filteredCountries.length > 1 ? (
          <ul>
            {filteredCountries.map((country) => (
              <li key={country.cca3}>
                {country.name.common}
                <button onClick={() => handleShowDetails(country)}>Show Details</button>
              </li>
            ))}
          </ul>
        ) : filteredCountries.length === 1 ? (
          <div>
            <h2>{filteredCountries[0].name.common}</h2>
            <img
              src={
                Array.isArray(filteredCountries[0].flags)
                  ? filteredCountries[0].flags[0] // If flags is an array
                  : filteredCountries[0].flags.png // If flags is an object
              }
              alt={`${filteredCountries[0].name.common} flag`}
              width="200"
            />
            <h3>Capital</h3>
            <p>{filteredCountries[0].capital ? filteredCountries[0].capital[0] : 'No capital available'}</p>

            <h3>Area</h3>
            <p>{filteredCountries[0].area} km²</p>

            <h3>Languages</h3>
            <ul>
              {Object.values(filteredCountries[0].languages).map((language, index) => (
                <li key={index}>{language}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No country found</p>
        )}
      </div>
    </div>
  );
};

export default CountryApp;
