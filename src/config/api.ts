import axios from 'axios';

const api = axios.create({
  baseURL: 'https://mdaqk8ek5j.execute-api.us-east-1.amazonaws.com/v1',
  headers: { token: 'ZXPURQOARHiMc6Y0flhRC1LVlZQVFRnm' },
});

export default api;
