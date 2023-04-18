export const getPosts = () => {
  return fetch("http://localhost:8088/posts").then((res) => res.json());
};

export const getPostById = (id) => {
  return fetch(`http://localhost:8088/posts/${id}`).then((res) => res.json());
};

export const addPost = (newPost) => {
  return fetch("http://localhost:8088/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(newPost)
  })
};

export const updatePost = (postId, newPost) => {
    return fetch(`http://localhost:8088/posts/${postId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newPost)
    })
}

export const deletePost = (postId) => {
  return fetch(`http://localhost:8088/posts${postId}`, {
    method: "DELETE"
  });
};
