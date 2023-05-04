export const getTags = () => {
    return fetch('http://localhost:8000/tags', {
      headers: {
        "Authorization": `Token ${localStorage.getItem("auth_token")}`
      }
    })
    .then(res => res.json())
}

export const createTag = (tag) => {
    return fetch("http://localhost:8000/tags", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("auth_token")}`
      },
      body: JSON.stringify(tag)
    })
  }

  export const getPostTags = () => {
    return fetch('http://localhost:8000/posttags', {
      headers: {
        "Authorization": `Token ${localStorage.getItem("auth_token")}`
      }
    })
    .then(res => res.json())
}

export const createPostTag = (post_tag) => {
    return fetch("http://localhost:8000/posttags", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("auth_token")}`
      },
      body: JSON.stringify(post_tag)
    })
  }

