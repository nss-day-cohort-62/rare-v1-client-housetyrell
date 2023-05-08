import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
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




    return <>
        <section className="individualPost">
            <h2>{post.title}</h2>
            <Link to={`/userDetails/${post.user?.id}`}>{post.user?.full_name}</Link>
            <div>{post.publication_date}</div>
            <div>{post.category?.label}</div>
            <p>{post.content}</p>
            {
                post?.tags?.map((tag) => {
                    return <>
                    <div>{tag.label}</div>
                    </>
                })
            }
            <Link to={`/comments/${postId}`}>View Comments</Link>
            <Link to={`/commentForm/${postId}`}>Add a comment</Link>
        </section>
    </>
}