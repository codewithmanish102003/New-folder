import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, logoutUser, registerUser, fetchUserDetails, deleteUser, deactivateUser,updateUser,registerOwner } from "../../../services/api/authApi";

//register thunk
export const registerUserThunk = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const response = await registerUser(userData)
      console.log("Registered", response)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

//register owner thunk
export const registerOwnerThunk = createAsyncThunk(
  "auth/registerOwner",
  async (ownerData,thunkAPI)=>{
    try {
      const response= await registerOwner(ownerData)
      console.log("Registered", response)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

// Login thunk
export const loginThunk = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await loginUser(userData);
      console.log("Logged in", response);
      localStorage.setItem("token", response.token);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Logout thunk
export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      const response = await logoutUser();
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Fetch user
export const fetchUserDetailsThunk = createAsyncThunk(
  "auth/fetchUserDetails",
  async (_, thunkAPI) => {
    try {
      const response = await fetchUserDetails();
      console.log(response)
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//delete user thunk
export const deleteUserThunk = createAsyncThunk(
  "auth/deleteUser",
  async (email, thunkAPI) => {
    try {
      const response = await deleteUser(email);
      consoke.log(response)
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//deactivate user thunk
export const deactivateUserThunk = createAsyncThunk(
  "auth/deactivateUser",
  async (email, thunkAPI) => {
    try {
      const response = await deactivateUser(email);
      consoke.log(response)
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//update user thunk
export const updateUserThunk = createAsyncThunk(
  "auth/updateUser",
  async (user, thunkAPI) => {
    console.log(user)
    try {
      const response = await updateUser(user);
      console.log(response)
      return response;
    } catch (error) {
      console.log("Error Occurred : ", error.response.data)
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

