export const getAllUsers = () => {
    return fetch('http://localhost:8000/rareusers', {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(res => res.json())
}

export const getUserById = (userId) => {
    return fetch(`http://localhost:8000/rareusers/${userId}`, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(res => res.json())
}

export const addNewSubscription = (newSubscription) => {
    return fetch("http://localhost:8000/subscriptions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(newSubscription)
    })
}

export const subscribeToUser = (data, userId) => {
    return fetch(`http://localhost:8000/rareusers/${userId}/subscribe`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(data)
    })
}
export const unsubscribeFromUser = (userId) => {
    return fetch(`http://localhost:8000/rareusers/${userId}/unsubscribe`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        },
    })
}