import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  blogPosts: [],
  blogPost: null,
  imageUrl: null,
  loading: false,
  error: null,
  lastId: 0,
  status: 200,
  updateButtonLoading: false,
  blogPostCreated: false,
  blogPostUpdated: false,
  blogPostRemoved: false,
  removeButtonLoading: false,
  nextPage: false,
  pageNumber: 1,
  category: null,
  country: null,
};

export const blogPostSlice = createSlice({
  name: "blogPosts",
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setBlogPostByCategory: (state, { payload }) => {
      state.blogPosts = [...state.blogPosts, ...payload];
      state.loading = false;
      state.error = null;
    },
    setBlogPostByCategoryNew: (state, { payload }) => {
      state.blogPosts = payload.map((x) => x);
      state.loading = false;
      state.error = null;
    },
    setBlogPostByCountry: (state, { payload }) => {
      state.blogPosts = [...state.blogPosts, ...payload];
      state.loading = false;
      state.error = null;
    },
    setBlogPostByCountryNew: (state, { payload }) => {
      state.blogPosts = payload.map((x) => x);
      state.loading = false;
      state.error = null;
    },
    setBlogPost: (state, { payload }) => {
      state.blogPost = payload;
      state.loading = false;
      state.error = null;
    },
    setImageUrl: (state, { payload}) => {
      state.imageUrl = payload;
      state.loading = false;
      state.error = null;
    },
    blogPostUpdated: (state, { payload }) => {
      state.blogPostUpdated = payload;
      state.loading = false;
      state.error = null;
    },
    blogPostCreated: (state, { payload }) => {
      state.blogPostCreated = payload;
      state.updateButtonLoading = false;
      state.loading = false;
      state.error = null;
    },
    blogPostRemoved: (state, { payload }) => {
      state.blogPostRemoved = payload;
      state.loading = false;
      state.error = null;
    },
    setUpdateButtonLoading: (state, { payload }) => {
      state.updateButtonLoading = payload;
      state.loading = false;
      state.error = null;
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
      state.buttonLoading = false;
    },
    setStatus: (state, { payload }) => {
      state.status = payload;
    },
    setNextPage: (state, { payload }) => {
      state.nextPage = payload;
    },
    setPageNumber: (state) => {
      state.pageNumber += 1;
    },
    reset: (state) => {
      state.blogPosts = [];
      state.blogPost = null;
      state.imageUrl = null;
      state.error = null;
      state.blogPostCreated = false;
      state.blogPostRemoved = false;
      state.blogPostUpdated = false;
      state.updateButtonLoading = false;
      state.removeButtonLoading = false;
      state.loading = false;
      state.pageNumber = 1;
      state.category = null;
      state.country = null;
      state.status = 200;
      state.lastId = 0;
      state.nextPage = false;
    },
    setRemoveButtonLoading: (state, { payload }) => {
      state.removeButtonLoading = payload;
      state.loading = false;
      state.error = null;
    },
    setLastId: (state, { payload }) => {
      state.lastId = payload;
    },
    setCategory: (state, { payload }) => {
      state.category = payload;
    },
    setCountry: (state, { payload }) => {
      state.country = payload;
    },
  },
});

export const {
  setLoading,
  setBlogPost,
  setImageUrl,
  setBlogPostByCategory,
  setBlogPostByCategoryNew,
  setBlogPostByCountry,
  setBlogPostByCountryNew,
  setError,
  blogPostCreated,
  blogPostRemoved,
  blogPostUpdated,
  setRemoveButtonLoading,
  setUpdateButtonLoading,
  setNextPage,
  reset,
  setStatus,
  setLastId,
  setPageNumber,
  setCategory,
  setCountry,
} = blogPostSlice.actions;
export default blogPostSlice.reducer;

export const blogPostSelector = (state) => state.blogPosts;
