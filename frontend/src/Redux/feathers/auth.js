import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    accessToken: null,
    isLoggedIn: false,
    userLoading: false,  // Added userLoading state
    tokenLoading: false,  // If you have a separate token loading state
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
      state.isLoggedIn = true;  
    },
    clearAccessToken: (state) => {
      state.accessToken = null;
      state.isLoggedIn = false;
    },
    authUserLoading: (state, action) => {
      const { payload } = action;
      state.userLoading = payload?.loading;  
    },
    toggleUserLoading: (state) => {
      state.userLoading = !state.userLoading;  
    },
    authUserLogout(state) {
      state.accessToken = null;
      state.isLoggedIn = false; 
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setSearch(state, action) {
      state.search = action.payload;
    }
    
  },
});

export const { setAccessToken,  setSearch, setUser, clearAccessToken,authUserLogout, authUserLoading, toggleUserLoading } = authSlice.actions;
export default authSlice.reducer;
