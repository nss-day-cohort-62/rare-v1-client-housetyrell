import { useEffect, useState } from "react"
import { getAllUsers } from "./UserManager"

export const UserList = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        getAllUsers().then((data) => {
            setUsers(data)
        })
    },[])
    return <>
    <div>
        {
            users.map((user) => {
                return(
                    <>
                    <div>{user.username}</div>
                    <div>{user.first_name}</div>
                    <div>{user.last_name}</div>
                    <div>{user.email}</div>
                    </>
                )
            })
        }
    </div>
    </>
}