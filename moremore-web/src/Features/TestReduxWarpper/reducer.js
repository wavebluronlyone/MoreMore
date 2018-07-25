import axios from 'axios';
import { store } from '../../store';
import { Reducer } from '../../Utils/redux-warper';
import config from '../../config';

export const reducer = new Reducer({
  Orders: {
    Orderlists: [],
  },
});

reducer.register('FETCH_ORDERLISTS', (state, action) => {
  const url = `${config.protocal}://${config.api}:${config.port}/api/Orders/`;
  axios.get(url).then((Response) => {
    const { data } = Response;
    store.update('UPDATE_ORDERLISTS', { data });
  });
  return state;
});

reducer.register('UPDATE_ORDERLISTS', (state, action) => {
  const { data } = action.params;
  state.Orders = data;
  return state;
});
