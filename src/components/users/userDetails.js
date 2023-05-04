import { useState, useEffect } from "react"
import { getAllUsers, getUserById } from "./UserManager"
import { useNavigate, useParams } from "react-router-dom"
import { addNewSubscription } from "./UserManager"
import { GetAllSubscriptions } from "../posts/postManager"
import { deleteSubscription } from "../posts/postManager"

export const UserDetails = () => {
    const [user, setUser] = useState({})
    const [subscriptions, setSubscriptions] = useState([])
    const [subscribed, setSubscribed] = useState({})
    
    const { userId } = useParams()
    const navigate = useNavigate()
    const localUser = localStorage.getItem("userId");
    useEffect(
        () => {
            getUserById(userId)
                .then((data) => {
                    setUser(data)
                })
            GetAllSubscriptions(localUser).then((data) => { setSubscriptions(data) })
        }, [userId]
    )
    useEffect(
        () => {
            const subscribed = subscriptions.find((s) => s.author_id === parseInt(userId) && localUser === s.follower_id)
            setSubscribed(subscribed)
        }, [subscriptions, userId]
    )
    // useEffect(
    //     () => {
    //         CreateNewSubscriptionOrDelete()
    //     }, [subscribed]
    // )

    const CreateNewSubscriptionOrDelete= () => {
        !subscribed ? addNewSubscription({
            follower_id: localUser,
            author_id: userId,
            created_on: new Date().toLocaleDateString()
        }).then(() => navigate("/"))
        : deleteSubscription(subscribed.id)
        .then(() =>  GetAllSubscriptions(localUser).then((data) => { setSubscriptions(data) }))
        .then(() => navigate(`/userDetails/${userId}`))
    }
    
    return <>
        <article className="userDetails">
            <div>{user.user?.first_name} {user.user?.last_name}</div>
            <div>{user.user?.username}</div>
            <div>{user.bio}</div>
            <button onClick={(evt) => {
                evt.preventDefault();
                CreateNewSubscriptionOrDelete()
            }}>{!subscribed ? "Subscribe" : "Unsubscribe"}</button>
        </article>
    </>
}