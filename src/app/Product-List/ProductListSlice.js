import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createProduct, fetchAllProducts, fetchProducts, searchProducts, updateProduct } from './ProductListAPI';
import { fetchAllProductsByFilters,fetchBrands,fetchCategories,fetchProductById } from './ProductListAPI';

const initialState = {
  products:[],
  brands:[],
  catgeories:[],
  status: 'idle',
  totalItems:0,
  selectedProduct:null,
  searchResults: [],
  AllProducts:[]
};

export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async () => {
    const response = await fetchAllProducts();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
    
  }
);

export const fetchProductsAsync = createAsyncThunk(
  'product/fetchProducts',
  async () => {
    const response = await fetchProducts();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
    
  }
);


export const searchProductsAsync = createAsyncThunk(
  'product/searchProducts',
  async (querystring) => {
    try {
      // Call the searchProducts API function with the searchTerm
      const data = await searchProducts(querystring);
      return data;
    } catch (error) {
      throw error; // Rethrow the error for better debugging
    }
  }
);  


 





export const fetchProductByIdAsync = createAsyncThunk(
  'product/fetchProductById',
  async (id) => {

    const response = await fetchProductById(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
    
  }
);


export const fetchAllProductsByFiltersAsync = createAsyncThunk(
  'product/fetchAllProductsByFilters',
  async ({filter,sort,pagination}) => {
    const response = await fetchAllProductsByFilters(filter,sort,pagination);
    // The value we return becomes the `fulfilled` action payload
    console.log(response.data,"filter")
    return response.data;
  }
);

export const fetchBrandsAsync = createAsyncThunk(
  'product/fetchBrands',
  async () => {

    const response = await fetchBrands();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
    
  }
);

export const fetchCategoriesAsync = createAsyncThunk(
  'product/fetchCategories',
  async () => {
    const response = await fetchCategories();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
    
  }
);


export const createProductAsync = createAsyncThunk(
  'product/createProduct',
  async (product) => {
    const response = await createProduct(product);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);



export const updateProductAsync = createAsyncThunk(
  'product/update',
  async (update) => {
    const response = await updateProduct(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);





export const productSlice = createSlice({
  name: 'product',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
     clearSelectedProduct:(state)=>{
      state.selectedProduct=null;
     }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
         state.products = action.payload 
      })

      .addCase(fetchProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
         state.AllProducts = action.payload 
      })

      .addCase(fetchAllProductsByFiltersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
         state.products = action.payload.products
         state.totalItems = action.payload.totalItems
         console.log(action.payload.products,"hii from addCase")
         console.log(action.payload.totalItems,"hii from addCase for totalItems ")

      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log("from Brands")
         state.brands = action.payload
         console.log(action.payload,"from barnds")
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
         state.catgeories = action.payload
         console.log(action.payload,"category")
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
         state.selectedProduct = action.payload
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
         state.products.push(action.payload)
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.products.findIndex(product=>product.id===action.payload.id)
        state.products[index]=action.payload;
      })
      .addCase(searchProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchProductsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.searchResults = action.payload;
      })
      .addCase(searchProductsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

  },
  
});

export const selectAllProducts = (state) => state.product.products
export const selectFullProducts = (state) =>state.product.AllProducts
console.log(selectFullProducts,"selectFullProducts")

export const selectTotalItems = (state) => state.product.totalItems
export const selectBrands = (state) => state.product.brands
console.log(selectBrands,"selectfrombrands")
export const  selectCategory = (state) => state.product.catgeories
export const  selectProductById = (state) => state.product.selectedProduct;

export const { increment } = productSlice.actions;

export const {clearSelectedProduct} = productSlice.actions;

export default productSlice.reducer;


