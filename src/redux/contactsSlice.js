import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createContact, deleteContact, requestContacts } from 'services/api';
import { STATUSES } from 'units/constants';

export const apiGetContacts = createAsyncThunk(
  'contacts/apiGetContacts',
  async (_, thunkApi) => {
    try {
      const data = await requestContacts();
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
      const { data } = await createContact(formData);
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
      const { data } = await deleteContact(id);
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
    addContact(state, action) {
      state.contacts = [...state.contacts, action.payload];
    },
    removeContact(state, action) {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
    },
    filterContact(state, action) {
      state.filterData = action.payload;
    },
  },
  extraReducers: builder =>
    builder
      //get contacts
      .addCase(apiGetContacts.pending, (state, action) => {
        state.status = STATUSES.pending;
        state.error = null;
      })
      .addCase(apiGetContacts.fulfilled, (state, action) => {
        state.status = STATUSES.success;
        state.contacts = action.payload;
      })
      .addCase(apiGetContacts.rejected, (state, action) => {
        state.status = STATUSES.error;
        state.error = action.payload;
        // add contact
      })
      .addCase(apiAddContact.pending, (state, action) => {
        state.status = STATUSES.pending;
        state.error = null;
      })
      .addCase(apiAddContact.fulfilled, (state, action) => {
        state.status = STATUSES.success;
        state.contacts = [...state.contacts, action.payload];
      })
      .addCase(apiAddContact.rejected, (state, action) => {
        state.status = STATUSES.error;
        state.error = action.payload;
      })
      // delete contact
      .addCase(apiDeleteContact.pending, (state, action) => {
        state.status = STATUSES.pending;
        state.error = null;
      })
      .addCase(apiDeleteContact.fulfilled, (state, action) => {
        state.status = STATUSES.success;
        state.contacts = state.contacts.filter(
          contact => Number(contact.id) !== Number(action.payload.id)
        );
      })
      .addCase(apiDeleteContact.rejected, (state, action) => {
        state.status = STATUSES.error;
        state.error = action.payload;
      }),
});

export const { filterContact } = contactSlice.actions;
export const contactsReducer = contactSlice.reducer;
