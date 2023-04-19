import { useState, useEffect } from "react"
import { getAllUsers, getUserById } from "./UserManager"
import { useNavigate, useParams } from "react-router-dom"
import { addNewSubscription } from "./UserManager"
export const UserDetails = () => {
    const [user, setUser] = useState({})
    const { userId } = useParams()
    const navigate = useNavigate()
    const localUser = localStorage.getItem("auth_token");
    const localUserObj = JSON.parse(localUser);
    useEffect(
        () => {
            getUserById(userId)
                .then((data) => {
                    setUser(data)
                })
        }, [userId]
    )
    const CreateNewSubscription = () => {
        addNewSubscription({
            follower_id: localUserObj,
            author_id: userId,
            created_on: new Date().toLocaleDateString()
        }).then(() => navigate("/"))
    }
    return <>
        <article className="userDetails">
            <div>{user.first_name} {user.last_name}</div>
            <div>{user?.profile_image}</div>
            <div>{user.username}</div>
            <div>{user.bio}</div>
            <div>{user.created_on}</div>
            <button onClick={(evt) => {
                evt.preventDefault();
                CreateNewSubscription();
            }}>Subscribe</button>
        </article>
    </>
}