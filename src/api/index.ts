import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

type RequestMethods = 'GET' | 'POST' | 'PUT' | 'DELETE';

enum RequestUrls {
  CREATE_USER = '/user',
}

export {apiClient, RequestMethods, RequestUrls};
