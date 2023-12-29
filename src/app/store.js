import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../app/Product-List/ProductListSlice'
import authReducer from '../Auth/AuthSlice'
import cartReducer from '../cart/CartSlice'
import OrderReducer from '../Order/orderSlice'
import userReducer from '../user/UserSlice'


export const store = configureStore({
  reducer: {
    product: productReducer,
    auth:authReducer,
    cart:cartReducer,
    order:OrderReducer,
    user:userReducer,
  },
});
