import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "api/userAPI";
import StorageKeys from "constants/storage-keys";

 export const register = createAsyncThunk("user/register", async (payload) => {
  // call Api to register
  const data = await userApi.register(payload);
  
  console.log('payload', payload)
  console.log('data', data)
  // save data to local storage
  localStorage.setItem(StorageKeys.TOKEN, data.jwt);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

  //return user data

  return data.user;
});


export const login = createAsyncThunk("user/login", async (payload) => {
  // call Api to register
  const data = await userApi.login(payload);

  console.log('data', data)
  
  // save data to local storage
  localStorage.setItem(StorageKeys.TOKEN, data.jwt);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

  //return user data

  return data.user;
});



const userSlice = createSlice({
  name: "user",
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKeys.USER)) ||  {},
    settings: {},
  },

  reducers: {},

  extraReducers: {
  
    [register.fulfilled]: (state, action) => {
      state.current = action.payload;
    },


    [login.fulfilled]: (state, action) => {
      state.current = action.payload;
    },

  },
});

const { reducer } = userSlice;

export default reducer;
