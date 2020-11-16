import axios from 'axios';
import axiosRetry from 'axios-retry';

const axiosClient = axios.create({
  // todo: use environment variable instead of hard coded string
  baseURL: 'https://myplanner.s3.amazonaws.com'
});

axiosRetry(axiosClient, { retries: 3 });

export { axiosClient };
