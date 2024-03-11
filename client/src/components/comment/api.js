import axios from "axios";

export const createComment = async (postId, parentId = null, content, userInfo) => {
  let comment = {
    postId: postId,
    parentId,
    content: content,
    email: userInfo.email,
    name: userInfo.name,
  };
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  try {
    const { data } = await axios.post(`/api/comment/create`, comment, config);
    //console.log(data);
    return data;
  } catch (error) {
    return error.message;
  }
};

export const getComments = async (postId) => {
  try {
    const { data } = await axios.get(`/api/comment/${postId}/get`);
    //console.log(data);
    return data;
  } catch (error) {
    return error.message;
  }
};

export const getComment = async (commentId) => {
  try {
    const { data } = await axios.get(`/api/comment/get/${commentId}`);
    //console.log(data);
    return data;
  } catch (error) {
    return error.message;
  }
};

export const updateComment = async (commentId, content, userInfo) => {
  let updatedComment = {
    _id: commentId,
    content: content,
  };
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  try {
    const { data } = await axios.put(`/api/comment/update`, updatedComment, config);
    //console.log(data);
    return data;
  } catch (error) {
    return error.message;
  }
};

export const deleteComment = async (commentId, userInfo) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  try {
    const { data } = await axios.delete(`/api/comment/delete/${commentId}`, config);
    //console.log(data);
    return data;
  } catch (error) {
    return error.message;
  }
};

export const deleteComments = async (postId, userInfo) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  try {
    const { data } = await axios.delete(`/api/comment/delete/post/${postId}`, config);
    //console.log(data);
    return data;
  } catch (error) {
    return error.message;
  }
};
