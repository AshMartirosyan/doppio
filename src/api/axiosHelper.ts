import axios, { AxiosRequestHeaders } from 'axios';
import APP_ENV from 'react-native-config';
import { store } from '../store';
import { handleLogOut } from '../store/commonActions';

const apiClient = axios.create({ baseURL: APP_ENV.MOBILE_APP_API_URL });

export const axiosRequest =
  <TData, TVariables>(
    query: string,
    headers?: AxiosRequestHeaders,
  ): ((variables?: TVariables) => Promise<TData>) =>
  async (variables?: TVariables) =>
    apiClient
      .post<{ data: TData; errors: any }>(
        '',
        {
          query,
          variables,
        },
        { headers: headers },
      )
      .then(res => {
        if (res.data.errors) {
          throw new Error(res.data.errors[0].message);
        }
        return res.data.data;
      });

apiClient.interceptors.request.use(
  function (config) {
    if (config.headers) {
      if (store.getState().auth.token) {
        config.headers.Authorization = `Bearer ${store.getState().auth.token}`;
      }

      config.headers.Mode = APP_ENV.MODE;
    }
    return config;
  },
  function (error) {
    console.warn('Errrr', error);
    //TODO handle some errors
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(function (res) {
  if (res.data.hasOwnProperty('errors')) {
    if (res.data.errors[0]?.response?.statusCode === 401) {
      handleLogOut();
    }
    return Promise.reject(res.data.errors[0].response.message);
  }

  return res.data;
});
