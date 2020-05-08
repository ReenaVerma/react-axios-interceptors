import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

// Set this if API URL is the same
// We've set a GLOBAL configuration
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
// Common headers are general headers for all types of requests
axios.defaults.headers.common['Authorization'] = 'Your auth token if you had one';
// Can set headers for specific request TYPES - EG
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Interceptors used to add common HEADERS
// axios.interceptors.request.use(config);
axios.interceptors.request.use(request => {
  console.log('CONFIG REQUEST', request);  //request config

  //we have to return request, otherwise we are blocking it
  return request;
}, error => {
  // We should Promise.reject(error), so we forward it to out request, as we wrote in component, so we can handle with a catch method
  // this error would only show eg for network error
  console.log('config error', error);
  return Promise.reject(error);
});

// interceptor to handle responses
axios.interceptors.response.use(response => {
  console.log('CONFIG RESPONSE: ', response);
  return response;
}, error => {
  console.log('CONFIR ERROR RESPONSE', error);
  return Promise.reject(error);
});


ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
