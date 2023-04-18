export const getTags = () => {
    return fetch('http://localhost:8088/tags')
    .then(res => res.json())
}

export const createTag = (tag) => {
    return fetch("http://localhost:8088/tags", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        label: tag.label
      })
    }).then(res => res.json())
  }