import getRequestInstance from './helpers/getRequestInstance.mjs';

const publicRequest = () => getRequestInstance({
  headers: {
    'content-type': 'application/json',
  },
});

const spotPublicRequest = () => getRequestInstance({
  baseURL: 'https://api.binance.com',
  headers: {
    'content-type': 'application/json',
  },
});

export {
  spotPublicRequest,
  publicRequest,
};
