
import axiosConfig from './axiosConfig';

export const putApi = (apiUrl, data, headers) => {
  const promise = new Promise((resolve, reject) => {
    axiosConfig({
      method: 'put',
      url: apiUrl,
      data,
      headers,
    })
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      });
  });

  return promise;
};

export const postApi = (apiUrl, data, headers) => {
  const promise = new Promise((resolve, reject) => {
    axiosConfig({
      method: 'post',
      url: apiUrl,
      data,
      headers,
    })
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      });
  });

  return promise;
};

export const getApi = (apiUrl, data, headers) => {
  const promise = new Promise((resolve, reject) => {
    axiosConfig({
      method: 'get',
      params: data,
      url: apiUrl,
      headers,
    })
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      });
  });
  return promise;
};
