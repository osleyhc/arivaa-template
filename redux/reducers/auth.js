import { getError } from '@arivaa-react/redux';
/**
 * Authentication Reducer
 */

import { removeAuthData, saveAuthData } from '../../helpers/security';
import { CHECK_LOGIN, LOGIN, LOGOUT } from '../actions';

/**
 * Reducer Function
 * @param state
 * @param action
 * @returns {*}
 */
export default function (state = null, action) {
  let data = null;
  switch (action.type) {
    case LOGIN:
      if (!getError(action)) {
        data = action.payload.data;
        saveAuthData(data);
        return {
          ...data,
        };
      } else {
        removeAuthData();
        return null;
      }
    case CHECK_LOGIN:
      if (action.error) {
        return null;
      } else {
        return {
          ...action.payload,
        };
      }
    case LOGOUT:
      removeAuthData();
      return null;
  }
  return state;
}
