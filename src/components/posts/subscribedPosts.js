import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getAllUsers } from "../users/UserManager"
import { GetAllSubscriptions, getPosts } from "./postManager"
import { getCategories } from "../categories/categoryManager"

export const PostSubscriptions = () => {
    const [posts, setPosts] = useState([])
    const [subscriptions, setSubscriptions] = useState([])
    const localUser = localStorage.getItem("auth_token");
    const localUserObj = JSON.parse(localUser);
    useEffect(
        () => {
            GetAllSubscriptions(localUserObj)
                .then((subscData) => {
                    setSubscriptions(subscData)
                })

        }, [])
    useEffect(
        () => {
        if(subscriptions.length !== 0) {
            getPosts()
                .then(data => {
                    const filteredPosts = data.filter(post => subscriptions.find(s => s.author_id === post.user_id))
                    setPosts(filteredPosts)
                })}
        }, [subscriptions]
    )

    return <>
        {
            posts.map(post => {
                return <>
                    <section className="individualPost">
                        <Link to={`/postDetails/${post.id}`}><h2>{post.title}</h2></Link>
                        <div>{post.user?.first_name} {post.user?.last_name}</div>
                        <div>{post.publication_date}</div>
                        <div>{post.category?.label}</div>
                        <div>{post.content}</div>
                    </section>
                </>
            })
        }
    </>
}