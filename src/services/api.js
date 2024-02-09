import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://65bfea9725a83926ab95da32.mockapi.io',
});

export const requestContacts = async () => {
  const { data } = await instance.get('/contacts');
  return data;
};

export const createContact = async formData => {
  const params = new URLSearchParams({
    name: formData.name,
    phone: formData.phone,
  });
  const data = await instance.post('/contacts', params);
  return data;
};

export const deleteContact = async id => {
  const data = await instance.delete('/contacts/' + id);
  return data;
};
