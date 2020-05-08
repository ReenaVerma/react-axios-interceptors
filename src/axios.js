import axios from 'axios';

// Creates an instance/copy of the axios object
// Use instances if you have different API URLs for http requests
const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

// Create header instances etc
instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

// Obviously, you can set your own interceptors:
// axios.interceptors.request.... etc

export default instance;