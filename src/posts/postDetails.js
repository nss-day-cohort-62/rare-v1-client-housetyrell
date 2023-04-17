import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Post } from "./post"
import { getPostById } from "./postManager"
export const PostDetails = () => {
    const { postId } = useParams()
    const [post, setPost] = useState({})
    useEffect(
        () => {
            getPostById(parseInt(postId))
                .then((data) => {
                    setPost(data)
                })
        },
        [postId]
    )
    console.log(postId)
    return <>
        <section className="individualPost">
            <h2>{post.title}</h2>
            <div>{post.user?.first_name} {post.user?.last_name}</div>
            <div>{post.publication_date}</div>
            <div>{post.category?.label}</div>
            <p>{post.content}</p>
        </section>
    </>
}