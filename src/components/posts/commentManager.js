export const getAllComments = () => {
    return fetch('http://localhost:8088/comments')
    .then(res => res.json())
}

export const createComment = (newComment) => {
    return fetch("http://localhost:8088/comments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(newComment)
    })
}

export const deleteComment = (commentId) => {
    return fetch(`http://localhost:8088/comments/${commentId}`, {
        method: "DELETE"
    });
};