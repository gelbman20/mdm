import axios from 'axios';
import { getLocalStorageItem } from '@/helpers';

axios.defaults.baseURL = 'https://conduit.productionready.io/api';

const accessToken = getLocalStorageItem('accessToken');
axios.defaults.headers.authorization = accessToken ? `Token ${accessToken}` : '';

export default axios;
