
import axios from 'axios';

const axiosConfig = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

axiosConfig.interceptors.request.use(
  config => {
    const rdata = JSON.parse(localStorage.getItem('okta-token-storage'));
    if (rdata != null) {
      const accessToken = Object.keys(rdata).length > 0 ? rdata.accessToken.accessToken : null;
      if (accessToken) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error.response);
  }
);

axiosConfig.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error && error.response.status === 401) {
      localStorage.clear();
      window.location = '/login';
      const msg = 'Session expired,Please try again.';
      return Promise.reject(msg);
    }
    return Promise.reject(error.response);
  }
);

export default axiosConfig;
