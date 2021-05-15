import axios from 'axios';

// check signup data and change them
const signup = (
  email,
  password,
  role,
  first_name,
  last_name,
  username,
  business_name,
  street,
  house_number,
  additional_address_info,
  postal_code,
  city,
  business_type,
  // dogName,
  // dogBirthday,
  // dogSize,
  // dogGender,
  ) => {
  return axios.post('/api/auth/signup', { 
    email,
    password,
    role,
    first_name,
    last_name,
    username,
    business_name,
    street,
    house_number,
    additional_address_info,
    postal_code,
    city,
    business_type,
    // dogName,
    // dogBirthday,
    // dogSize,
    // dogGender,
    })
    .then(response => {
      console.log(response.data)
      return response.data;
    })
    .catch(err => {
      return err;
    })
}

const login = (email, password) => {
  return axios.post('/api/auth/login', { email, password })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return err;
    })
}

const logout = () => {
  return axios.delete('/api/auth/logout')
    .then(response => {
      return response.data
    })
    .catch(err => {
      return err
    })
}

export { signup, logout, login };