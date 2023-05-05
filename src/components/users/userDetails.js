import { useState, useEffect } from "react"
import { getAllUsers, getUserById, subscribeToUser, unsubscribeFromUser } from "./UserManager"
import { useNavigate, useParams } from "react-router-dom"
import { addNewSubscription } from "./UserManager"
import { GetAllSubscriptions } from "../posts/postManager"
import { deleteSubscription } from "../posts/postManager"

export const UserDetails = () => {
    const [user, setUser] = useState({})
    const [signedInUser, setUserSignedIn] = useState({})
    const [subscriptions, setSubscriptions] = useState([])
    const [subscribed, setSubscribed] = useState(false)

    const { userId } = useParams()
    const navigate = useNavigate()
    const localUser = localStorage.getItem("userId");
    useEffect(
        () => {
            getUserById(userId)
                .then((data) => {
                    setUser(data)
                })
            getUserById(localUser)
                .then(data => setUserSignedIn(data))
            // GetAllSubscriptions(localUser).then((data) => { setSubscriptions(data) })
        }, [userId]
    )
    // useEffect(
    //     () => {
    //         // const subscribed = signedInUser.subscribed
    //         if (user.subscribed === 1) {
    //             setSubscribed(!subscribed)
    //         }
    //     }, [userId]
    // )
    console.log(signedInUser.subscribed)
    // useEffect(
    //     () => {
    //         CreateNewSubscriptionOrDelete()
    //     }, [subscribed]
    // )

    const CreateNewSubscriptionOrDelete = () => {
        const date = {
            created_on: new Date().toISOString().split('T')[0]
        }
        user.subscribed === 0 ? subscribeToUser(date, userId).then(() => navigate("/"))
            : unsubscribeFromUser(userId)
                .then(() => navigate(`/`))
    }

    return <>
        <article className="userDetails">
            <div>{user.full_name}</div>
            <div>{user.username}</div>
            <div>{user.bio}</div>
            <button onClick={(evt) => {
                evt.preventDefault();
                CreateNewSubscriptionOrDelete()
            }}>{user.subscribed === 0 ? "Subscribe" : "Unsubscribe"}</button>
        </article>
    </>
}