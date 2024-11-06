import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 10 }, // Ramp up to 10 users in 30 seconds
    { duration: '1m', target: 10 },  // Stay at 10 users for 1 minute
    { duration: '30s', target: 0 },  // Ramp down to 0 users in 30 seconds
  ],
};

export default function () {
  const res = http.get('http://localhost:3000');  // Your app's URL here
  check(res, {
    'status is 200': (r) => r.status === 200,
    'body contains Hello World': (r) => r.body.includes('Hello World'),
  });
  sleep(1); // Simulate a user waiting between requests
}
