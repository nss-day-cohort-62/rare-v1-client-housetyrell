export const getPosts = () => {
  return fetch("http://localhost:8000/posts", {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    }
  }).then((res) => res.json());
};



export const getPostById = (id) => {
  return fetch(`http://localhost:8000/posts/${id}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    }
  }).then((res) => res.json());
};

export const addPost = (newPost) => {
  return fetch("http://localhost:8000/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    },
    body: JSON.stringify(newPost)
  })
};

export const updatePost = (newPost) => {
  return fetch(`http://localhost:8000/posts/${newPost.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    },
    body: JSON.stringify(newPost)
  })
}

export const deletePost = (postId) => {
  return fetch(`http://localhost:8000/posts/${postId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    }
  });
};
export const getPostsBySearch = (searchTerm) => {
  return fetch(`http://localhost:8000/posts?search=${searchTerm}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    }
  }).then(res => res.json())
}
export const GetPostsByCategory = (id) => {
  return fetch(`http://localhost:8000/posts?category_id=${id}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    }
  }).then((res) => res.json());
}
export const GetPostsByUser = (id) => {
  return fetch(`http://localhost:8000/posts?user_id=${id}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    }
  }).then((res) => res.json());
}
export const GetPostsByTag = (id) => {
  return fetch(`http://localhost:8000/posts?tag_id=${id}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    }
  }).then((res) => res.json());
}

export const getPostsByHttpString = (httpString) => {
  return fetch(`http://localhost:8000/posts?${httpString}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    }
  }).then((res) => res.json());
}

export const GetAllSubscriptions = (userId) => {
  return fetch(`http://localhost:8000/subscriptions?follower_id=${userId}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    }
  }).then((res) => res.json());
}
// export const GetPostsByTag = (id) => {
//   return fetch(`http://localhost:8000/posts?tag=${id}`).then((res) => res.json());
// }
export const deleteSubscription = (id) => {
  return fetch(`http://localhost:8000/subscriptions/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    }
  });
};

