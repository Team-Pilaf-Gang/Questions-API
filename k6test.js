import http from 'k6/http';
import { Counter } from 'k6/metrics';

export const requests = new Counter('http_reqs');

export const options = {
  vus: 100,
  duration: '15s'
};

const baseUrl = 'http://localhost:5005/test';


export default function () {
  //const generateRandomProductID = () => Math.floor(Math.random() * 1000);
  //const url = `${baseUrl}/${generateRandomProductID()}/answers`;
  const url = `${baseUrl}/900000`;
  const res = http.get(url);
}