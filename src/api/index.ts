import axios from 'axios';
import Constants from 'expo-constants';

const API_URL = Constants.manifest?.extra?.API_URL as string;

if (!API_URL) {
  throw new Error('API_URL is not defined');
}

const apiClient = axios.create({
  baseURL: API_URL,
});

type RequestMethods = 'GET' | 'POST' | 'PUT' | 'DELETE';

enum RequestUrls {
  CREATE_USER = '/user',
}

export {apiClient, RequestMethods, RequestUrls};
