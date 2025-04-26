import { createSlice } from "@reduxjs/toolkit";
import { ContactUsAPI } from "../../services/contact-us";

const ContactSlice = createSlice({
  name: "contacts",
  initialState: {
    contacts: [],
    total: null,
    deleteContactID: null,
    status: null,
  },
  reducers: {
    isStatusText: (state, action) => {
      state.status = action.payload;
    },
    isDeleteContactID: (state, action) => {
      state.deleteContactID = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(ContactUsAPI.getContactUs.fulfilled, (state, action) => {
        state.contacts = action.payload?.data?.data.contacts;
        state.total = action.payload?.data.data.total;
      })
      .addCase(ContactUsAPI.deleteContact.fulfilled, (state) => {
        state.status = true;
        state.contacts = state.contacts.filter(
          (contact) => contact.id !== state.deleteContactID
        );
      });
  },
});

export const { isDeleteContactID, isStatusText } = ContactSlice.actions;
export default ContactSlice;
