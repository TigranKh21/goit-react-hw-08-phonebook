import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import axios from 'axios';

export const authInstance = axios.create({
  baseURL: 'https://connections-api.herokuapp.com/',
});

const setToken = token => {
  authInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearToken = () => {
  authInstance.defaults.headers.common.Authorization = ``;
};

export const apiRegistration = createAsyncThunk(
  'auth/apiRegistration',
  async (formData, thunkApi) => {
    try {
      const { data } = await authInstance.post('/users/signup', formData);
      setToken(data.token);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiLogin = createAsyncThunk(
  'auth/apiLogin',
  async (formData, thunkApi) => {
    try {
      const { data } = await authInstance.post('/users/login', formData);
      setToken(data.token);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiRefresh = createAsyncThunk(
  'auth/apiRefresh',
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    const token = state.auth.token;
    try {
      setToken(token);
      const { data } = await authInstance.get('/users/current');
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiLogout = createAsyncThunk(
  'auth/apiLogout',
  async (_, thunkApi) => {
    try {
      await authInstance.post('/users/logout');
      clearToken();
      return;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  token: null,
  isLoggedIn: false,
  userData: { name: null, email: null },
  error: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  /* reducers: {
    login(state, action) {
      state.contacts = [...state.contacts, action.payload];
    },
    logout(state, action) {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
    },
    filterContact(state, action) {
      state.filterData = action.payload;
    },
  }, */
  extraReducers: builder =>
    builder
      // register
      .addCase(apiRegistration.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.userData = action.payload.user;
        state.token = action.payload.token;
      })
      //login
      .addCase(apiLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.userData = action.payload.user;
        state.token = action.payload.token;
      })
      // refresh
      .addCase(apiRefresh.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.userData = action.payload;
      })
      // logout
      .addCase(apiLogout.fulfilled, () => {
        return initialState;
      })
      // handle pending for each thunk pending
      .addMatcher(
        isAnyOf(
          apiRegistration.pending,
          apiLogin.pending,
          apiRefresh.pending,
          apiLogout.pending
        ),
        state => {
          state.isLoading = true;
          state.error = null;
        }
      )
      // handle reject for each thunk rejected
      .addMatcher(
        isAnyOf(
          apiRegistration.rejected,
          apiLogin.rejected,
          apiRefresh.rejected,
          apiLogout.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      ),
});

export const { filterContact } = authSlice.actions;
export const authReducer = authSlice.reducer;
