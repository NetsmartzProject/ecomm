import { addToCart ,fetchItemsByUserId,updateCart,deleteItemFromCart, resetCart} from "./CartAPI";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    value:0,
    status: 'idle',
    items:[],

  };

export const addTOCartAsync = createAsyncThunk(
    'cart/addToCart',
    async (item) => {
      const response = await addToCart(item);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  );

  export const fetchItemsByUserIdAsync = createAsyncThunk(
    'cart/fetchItemsByUserId',
    async (userId) => {
      const response = await fetchItemsByUserId(userId);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  );

  
export const updateCartAsync = createAsyncThunk(
  'cart/updateCart',
  async (update) => {
    const response = await updateCart(update);
    // The value we return becomes the `fulfilled` action payload
    console.log(update,"update from Async ")
    return response.data;
  }
);


export const deleteItemFromCartAsync = createAsyncThunk(
  'cart/deleteItemFromCart',
  async (itemID) => {
    const response = await deleteItemFromCart(itemID);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);


export const resetCartAsync = createAsyncThunk(
  'cart/resetCart',
  async (userId) => {
    const response = await resetCart(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);



  export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
      increment: (state) => {
        state.value += 1;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(addTOCartAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(addTOCartAsync.fulfilled, (state, action) => {
          state.status = 'idle';
          state.items.push(action.payload);
        })
        .addCase(fetchItemsByUserIdAsync.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.items=action.payload;
          })
          .addCase(updateCartAsync.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(updateCartAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            const index = state.items.findIndex(item=>item.id===action.payload.id)
            state.items[index]=action.payload;
          })
          .addCase(deleteItemFromCartAsync.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            const index = state.items.findIndex(item=>item.id===action.payload.id)
            state.items.splice(index,1)
          })
          .addCase(resetCartAsync.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(resetCartAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.items=[];
          });
    },
  });
  

  export const selectItems = (state) =>state.cart.items;
  export default cartSlice.reducer;
