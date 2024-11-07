import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (newPerson) => {
  return axios.post(baseUrl, newPerson);
};

const update = (id, updatedPerson) => {
  return axios.put(`${baseUrl}/${id}`, updatedPerson);
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

// Assign the object to a variable before exporting it
const personService = {
  getAll,
  create,
  update,
  remove
};

export default personService;
