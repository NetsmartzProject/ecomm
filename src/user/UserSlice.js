
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLoggedInUserOrders, updateUser, fetchLoggedInUser, updateProfile, fetchPincode, fetchTotalOrders } from './UserAPI';
// import { UserOrders } from './components/Userorder';

const initialState = {
  userOrders: [],
  orders:[],
  status: 'idle',
  userInfo: null,
  userProfile: null,  
  data: null,
  TotalOrder:[],
};

export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  'user/fetchLoggedInUserOrders',
  async (id) => {
    const response = await fetchLoggedInUserOrders(id);
    return response.data;
  }
);

export const fetchLoggedInUserAsync = createAsyncThunk(
  'user/fetchLoggedInUser',
  async (id) => {
    const response = await fetchLoggedInUser(id);
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (id) => {
    const response = await updateUser(id);
    return response.data;
  }
);


export const fetchTotalOrdersAsync = createAsyncThunk(
  'user/fetchAllOrders',
  async () => {
    try {
      const response = await fetchTotalOrders();
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);



export const updateProfileAsync = createAsyncThunk(
  'user/updateProfile',
  async ({ id, shubh }) => {
    const response = await updateProfile(id, shubh);
    return response.data;
  }
);


export const fetchPincodeAsync = createAsyncThunk(
  'user/fetchPincode',
  async ({ pincode }) => {
    try {
      const response = await fetchPincode(pincode);
      console.log(response,"fetch from postman")
      return response.data;
    } catch (error) {
      console.error('Error fetching pin code details:', error);
      throw error; // Rethrow the error to be caught by the rejected action
    }
  }
);




export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userOrders = action.payload;
        console.log(state.userOrders,"action payload update")

      })
      .addCase(updateProfileAsync.pending, (state) => {
        state.status = 'loading';
      })
     
      .addCase(updateProfileAsync.fulfilled, (state, action) => {
        console.log(action.payload,"edited Profile")
        state.userProfile = action.payload;
      })
      
      .addCase(updateProfileAsync.rejected, (state, action) => {
        console.error(action.error, 'Update profile error');
        state.status = 'error';
      })

      .addCase(fetchPincodeAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPincodeAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchPincodeAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(fetchTotalOrdersAsync.pending,(state)=>{
        state.status='loading';
      })
      .addCase(fetchTotalOrdersAsync.fulfilled,(state,action)=>{
        state.status='succeeded'
        state.TotalOrder= action.payload;
      })
      .addCase(fetchTotalOrdersAsync.rejected,(state,action)=>{
        state.status='Rejected';
        state.error = action.error.message
      })
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      });
  },
});

export const selectUserOrders = (state) => state.user.userOrders;
export const selectOrders = (state) => state.user.orders;

export const selectUserInfo = (state) => state.user.userInfo;
export const selectUserProfile = (state) => state.user.userProfile;
export const selectUserpincode = (state) => state.user.data;
export const  selectTotalOrderes = (state) =>state.user.TotalOrder;


export default userSlice.reducer;

