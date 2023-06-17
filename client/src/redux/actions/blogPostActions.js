import axios from "axios";

import {
  setLoading,
  setBlogPost,
  setBlogPostByCategory,
  setError,
  blogPostCreated,
  blogPostRemoved,
  blogPostUpdated,
  setRemoveButtonLoading,
  setUpdateButtonLoading,
  setNextPage,
  setPreviousPage,
  reset,
  setStatus,
  setPageItems,
  setPageNumber,
} from "../slices/blogPost";

export const getBlogPostsByCategory = (category, pageItems, navigate) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    let postId = pageItems;
    const { data, status } = await axios.get(`/api/blog-posts/${category}/${postId}/${navigate}`);
    dispatch(setBlogPostByCategory(data));
    dispatch(setStatus(status));
    //Get the last post id in current page
    if (data.length > 0) {
      data.sort(compare);
      dispatch(setPageItems(data[data.length - 1]._id));
    }
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "An unexpected error has occured. Please try again later."
      )
    );
  }
};

export const getBlogPost = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get(`/api/blog-posts/post/${id}`);
    dispatch(setBlogPost(data));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "An unexpected error has occured. Please try again later."
      )
    );
  }
};

export const nextPageClick = (navigate) => async (dispatch) => {
  dispatch(setNextPage(navigate));
  dispatch(setPageNumber(true));
};

export const previousPageClick = (navigate) => async (dispatch) => {
  dispatch(setPreviousPage(navigate));
  dispatch(setPageNumber(false));
};

export const resetLoaderAndFlags = () => async (dispatch) => {
  dispatch(reset());
};

export const createNewBlogPost = (newPost) => async (dispatch, getState) => {
  dispatch(blogPostCreated(false));
  dispatch(setUpdateButtonLoading(true));
  const {
    user: { userInfo },
  } = getState();

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`/api/blog-posts`, newPost, config);
    dispatch(blogPostCreated(data));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "An unexpected error has occured. Please try again later."
      )
    );
  }
};

export const updatePost = (updatedPost) => async (dispatch, getState) => {
  dispatch(blogPostUpdated(false));
  dispatch(setUpdateButtonLoading(true));
  const {
    user: { userInfo },
  } = getState();

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.put(`/api/blog-posts`, updatedPost, config);
    dispatch(blogPostUpdated(true));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "An unexpected error has occured. Please try again later."
      )
    );
  }
};

export const removePost = (_id) => async (dispatch, getState) => {
  dispatch(setRemoveButtonLoading(true));
  dispatch(blogPostRemoved(false));
  const {
    user: { userInfo },
  } = getState();

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.delete(`/api/blog-posts/${_id}`, config);
    dispatch(setBlogPostByCategory(data));
    dispatch(blogPostRemoved(true));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "An unexpected error has occured. Please try again later."
      )
    );
  }
};

const compare = (a, b) => {
  if (a._id < b._id) {
    return 1;
  }
  if (a._id > b._id) {
    return -1;
  }
  return 0;
};
