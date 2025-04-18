import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, logoutThunk, registerUserThunk, fetchUserDetailsThunk, updateUserThunk,registerOwnerThunk } from "./authThunk";

const token = localStorage.getItem("token");

const initialState = {
  isLoggedIn: !!token,
  status: "idle",
  error: null,
  firstname: null,
  lastname: null,
  email: null,
  phone: null,
  role: null,
  gstno: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.status = "succeeded";
        state.isLoggedIn = true;
        state.role = action.payload.role;
        if (state.role === "owner") {
          state.firstname = action.payload.owner.firstname;
          state.lastname = action.payload.owner.lastname
          state.email = action.payload.owner.email;
          state.gstno = action.payload.owner.gstno;
          state.phone = action.payload.owner.contact;
        } else {
          state.firstname = action.payload.user.firstname;
          state.lastname = action.payload.user.lastname;
          state.phone = action.payload.user.contact;
          state.email = action.payload.user.email;
          state.gender = action.payload.user.gender;
        }
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(logoutThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.status = "succeeded";
        state.isLoggedIn = false;
        state.username = null;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(registerOwnerThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(registerOwnerThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchUserDetailsThunk.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.status = "succeeded";
        state.isLoggedIn = true;
        state.role = action.payload.role;
        if (state.role === "owner") {
          state.firstname = action.payload.firstname;
          state.lastname = action.payload.lastname
          state.phone = action.payload.contact
          state.email = action.payload.email;
          state.gstno = action.payload.gstno;
          state.id= action.payload._id;
        } else {
          state.firstname = action.payload.firstname;
          state.lastname = action.payload.lastname
          state.phone = action.payload.contact
          state.email = action.payload.email;
          state.gender = action.payload.gender
          state.id= action.payload._id;
        }
      })
      .addCase(fetchUserDetailsThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.success = action.payload;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
  },
});

export default authSlice.reducer;