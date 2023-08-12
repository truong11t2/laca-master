import axios from "axios";

import {
  setLoading,
  setBlogPost,
  setImageUrl,
  setCoverUrl,
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
  reset,
  setStatus,
  setLastId,
  setNextPage,
  setPageNumber,
  setCategory,
  setCountry,
} from "../slices/blogPost";
import { deleteComments } from "../../components/comment/api";

export const getBlogPostsByCategory =
  (curCategory, lastId, nextPage, category) => async (dispatch) => {
    dispatch(setLoading(true));

    //Check if category is changed
    //const prevCategory = useSelector((state) => state.blogPosts);
    //const { oldCategory: category } = prevCategory;

    try {
      if (curCategory !== category) {
        lastId = 0;
        nextPage = false;
      }
      const { data, status } = await axios.get(
        `/api/blog-posts/${curCategory}/${lastId}/${nextPage}`
      );
      if (curCategory === category) {
        dispatch(setBlogPostByCategory(data));
      } else {
        dispatch(setBlogPostByCategoryNew(data));
        dispatch(setCategory(curCategory));
      }

      dispatch(setStatus(status));
      //Get the last post id in current page
      if (data.length > 0) {
        data.sort(compare);
        dispatch(setLastId(data[data.length - 1]._id));
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

export const getBlogPostsByCountry =
  (curCountry, lastId, nextPage, country) => async (dispatch) => {
    dispatch(setLoading(true));

    //Check if category is changed
    //const prevCategory = useSelector((state) => state.blogPosts);
    //const { oldCategory: category } = prevCategory;

    try {
      if (curCountry !== country) {
        lastId = 0;
        nextPage = false;
      }
      const { data, status } = await axios.get(
        `/api/blog-posts/country/${curCountry}/${lastId}/${nextPage}`
      );
      //console.log(lastId);
      //console.log(nextPage);
      if (curCountry === country) {
        dispatch(setBlogPostByCountry(data));
      } else {
        dispatch(setBlogPostByCountryNew(data));
        dispatch(setCountry(curCountry));
      }

      dispatch(setStatus(status));
      //Get the last post id in current page
      if (data.length > 0) {
        data.sort(compare);
        dispatch(setLastId(data[data.length - 1]._id));
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

export const getNextPage = () => async (dispatch) => {
  dispatch(setNextPage(true));
  dispatch(setPageNumber());
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

export const uploadFile =
  (file, folder, setPostImage) => async (dispatch, getState) => {
    const {
      user: { userInfo },
    } = getState();
    var key, value, val;
    for ([key, value] of file.entries()) {
      if (value instanceof File) {
        val = value.name;
      } else {
        val = value;
      }
      //console.log(key + ": " + val);
    }
    console.log(folder);
    try {
      const config = {
        headers: {
          header: { "content-type": "multipart/form-data" },
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `api/blog-posts/uploadfiles`,
        file,
        config
      );
      if (val.includes("cover")) {
        await dispatch(setCoverUrl(data));
        setPostImage(data.url);
      } else {
        await dispatch(setImageUrl(data));
        setPostImage(data.url);
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

export const resetPost = () => async (dispatch) => {
  dispatch(reset());
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

    deleteComments(_id, userInfo);

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
