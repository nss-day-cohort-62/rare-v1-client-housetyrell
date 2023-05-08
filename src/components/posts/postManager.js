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

export const updatePost = (newPost) => {
    return fetch(`http://localhost:8088/posts/${newPost.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(newPost)
    })
}

export const deletePost = (postId) => {
  return fetch(`http://localhost:8088/posts/${postId}`, {
    method: "DELETE"
  });
};
export const getPostsBySearch = (searchTerm) => {
  return fetch(`http://localhost:8088/posts?search=${searchTerm}`).then(res => res.json())
}
export const GetPostsByCategory = (id) => {
  return fetch(`http://localhost:8088/posts?category_id=${id}`).then((res) => res.json());
}
export const GetPostsByUser = (id) => {
  return fetch(`http://localhost:8088/posts?user_id=${id}`).then((res) => res.json());
}
export const GetPostsByTag = (id) => {
  return fetch(`http://localhost:8088/posts?tag_id=${id}`).then((res) => res.json());
}

export const getPostsByHttpString = (httpString) => {
  return fetch(`http://localhost:8088/posts?${httpString}`).then((res) => res.json());
}

export const GetAllSubscriptions = (userId) => {
  return fetch(`http://localhost:8088/subscriptions?follower_id=${userId}`).then((res) => res.json());
}
// export const GetPostsByTag = (id) => {
//   return fetch(`http://localhost:8088/posts?tag=${id}`).then((res) => res.json());
// }
export const deleteSubscription = (id) => {
  return fetch(`http://localhost:8088/subscriptions/${id}`, {
    method: "DELETE"
  });
};

