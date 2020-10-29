import { ThunkAction } from 'redux-thunk';

import {
  SignUpData, AuthAction, SET_USER, User, SET_LOADING, SIGN_OUT, SignInData,
  SET_ERROR, NEED_VERIFICATION, SET_SUCCESS, AuthState
} from '../types';
import { RootState } from '..';
import api from '../../services/api';

/**
 * CREATE USER
 */
export const signUp = (data: SignUpData, onError: () => void): ThunkAction<void, RootState, null, AuthAction> => {
  return async dispatch => {
    try {
      await api.post('/register', {
        name: data.name,
        email: data.email,
        password: data.password
      });

      signIn(data, () => { });
    } catch (err) {
      console.log(err);
      onError();
      dispatch({
        type: SET_ERROR,
        payload: err.message
      })
    }
  }
}

export const signIn = (data: SignInData, onError: () => void): ThunkAction<void, RootState, null, AuthAction> => {
  return async dispatch => {
    console.log('called')
    await api.post('/login', {
      email: data.email,
      password: data.password
    })
      .then((res) => {
        const userData: User = {
          email: res.data.email,
          id: res.data.id,
          createdAt: res.data.created_at,
          name: res.data.name,
          role: res.data.role,
          token: res.data.token
        }
        dispatch({
          type: NEED_VERIFICATION
        });
        dispatch({
          type: SET_USER,
          payload: userData
        });
      })
      .catch((err) => {
        console.log(err);
        onError();
        dispatch({
          type: SET_ERROR,
          payload: err.message
        })
      })
  }
}

export const getLoggedUser = (token: string): ThunkAction<void, RootState, null, AuthAction> => {
  return async dispatch => {
    try {
      const user = await api.get("/me", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const userData = user.data() as User;
      dispatch({
        type: SET_USER,
        payload: userData,
      })
    } catch (err) {
      console.log(err);
    }
  }
}

export const signOut = (): ThunkAction<void, RootState, null, AuthAction> => {
  return async dispatch => {
    try {
      dispatch(setLoading(true));
      dispatch({ type: SIGN_OUT })
    } catch (err) {
      console.log(err);
      dispatch(setLoading(false));
    }
  }
}

export const setLoading = (value: Boolean): ThunkAction<void, RootState, null, AuthAction> => {
  return dispatch => {
    dispatch({
      type: SET_LOADING,
      payload: value
    });
  }
}

export const setError = (msg: string): ThunkAction<void, RootState, null, AuthAction> => {
  return dispatch => {
    dispatch({
      type: SET_ERROR,
      payload: msg
    });
  }
}

export const setNeedVerification = (): ThunkAction<void, RootState, null, AuthAction> => {
  return dispatch => {
    dispatch({
      type: NEED_VERIFICATION
    });
  }
}

export const setSuccess = (msg: string): ThunkAction<void, RootState, null, AuthAction> => {
  return dispatch => {
    dispatch({
      type: SET_SUCCESS,
      payload: msg
    });
  }
}