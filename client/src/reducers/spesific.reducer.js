import _ from 'lodash';
import actionTypes from '../constants/action-types';

export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PASIEN_ID:
        return { ...state, [action.payload[0].no_pasien]: action.payload[0]};
    default:
      return state;
  }
};
