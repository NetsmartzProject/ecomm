import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser ,checkUser, signOut} from './AuthAPI';
import { updateUser } from '../user/UserAPI';


const initialState = {
  loggedInUser: null,
  status: 'idle',
  error:null,
};


export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (userData) => {
    const response = await createUser(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);



  
export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (update) => {
    const response = await updateUser(update);
    console.log(update,"test2update")
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const checkUserAsync = createAsyncThunk(
  'user/checkUser',
  async (loginInfo) => {
    const response = await checkUser(loginInfo);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const signOutAsync = createAsyncThunk(
  'user/signOut',
  async (loginInfo) => {
    const response = await signOut(loginInfo);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);



export const authSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state,action) => {
        state.status = 'idle';
        state.error= action.error
      })
      .addCase(updateUserAsync.pending, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(updateUserAsync.fulfilled, (state,action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(signOutAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(signOutAsync.fulfilled, (state,action) => {
        state.status = 'idle';
        state.loggedInUser = null;
      });
  },
});

export const selectLoggedInUser = (state)=>state.auth.loggedInUser;

export const selectError = (state) =>state.auth.error;
console.log(selectError,"errror")
export const { increment } = authSlice.actions;


export default authSlice.reducer;
