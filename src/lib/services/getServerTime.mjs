import { spotPublicRequest } from '../requestClient.mjs';


const getServerTime = () => spotPublicRequest()
  .get('/api/v3/time')
  .then(({ data }) => data)
  .catch((error) => console.log(error.message));

export default getServerTime;
