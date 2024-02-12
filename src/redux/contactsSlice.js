import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { STATUSES } from 'units/constants';
import { authInstance } from './auth/authSlice';

export const apiGetContacts = createAsyncThunk(
  'contacts/apiGetContacts',
  async (_, thunkApi) => {
    try {
      const { data } = await authInstance.get('/contacts');
      return data;
    } catch (error) {
      error.message(error);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiAddContact = createAsyncThunk(
  'contacts/apiAddContact',
  async (formData, thunkApi) => {
    try {
      const { data } = await authInstance.post('/contacts', formData);
      return data;
    } catch (error) {
      error.message(error);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiDeleteContact = createAsyncThunk(
  'contacts/apiDeleteContact',
  async (id, thunkApi) => {
    try {
      const { data } = await authInstance.delete(`/contacts/${id}`);
      return data;
    } catch (error) {
      error.message(error);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  contacts: [],
  status: STATUSES.idle,
  error: null,
  filterData: '',
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    filterContact(state, action) {
      state.filterData = action.payload;
    },
  },
  extraReducers: builder =>
    builder
      //get contacts
      .addCase(apiGetContacts.fulfilled, (state, action) => {
        state.status = STATUSES.success;
        state.contacts = action.payload;
      })
      // add contact
      .addCase(apiAddContact.fulfilled, (state, action) => {
        state.status = STATUSES.success;
        state.contacts = [...state.contacts, action.payload];
      })
      // delete contact
      .addCase(apiDeleteContact.fulfilled, (state, action) => {
        state.status = STATUSES.success;
        state.contacts = state.contacts.filter(
          contact => contact.id !== action.payload.id
        );
      })
      // handle pending for each thunk pending
      .addMatcher(
        isAnyOf(
          apiGetContacts.pending,
          apiAddContact.pending,
          apiDeleteContact.pending
        ),
        state => {
          state.status = STATUSES.pending;
          state.error = null;
        }
      )
      // handle reject for each thunk rejected
      .addMatcher(
        isAnyOf(
          apiGetContacts.rejected,
          apiAddContact.rejected,
          apiDeleteContact.rejected
        ),
        (state, action) => {
          state.status = STATUSES.error;
          state.error = action.payload;
        }
      ),
});

export const { filterContact } = contactSlice.actions;
export const contactsReducer = contactSlice.reducer;
