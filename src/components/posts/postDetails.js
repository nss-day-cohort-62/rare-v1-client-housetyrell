import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Post } from "./post"
import { getPostById } from "./postManager"
//import { getPostTags } from "../tags/tagManager";
export const PostDetails = () => {
    const { postId } = useParams()
    const [post, setPost] = useState({})
    // const [postTags, setPostTags] = useState([])
    useEffect(
        () => {
            getPostById(parseInt(postId))
                .then((data) => {
                    setPost(data)
                })
        },
        [postId]
    )

    // useEffect(
    //     () => {
    //         getPostTags().then((tags) => {
    //              const filteredTags = tags.filter((tag) => tag.post_id === postId)
    //              setPostTags(filteredTags)
    //             })
    //     },
    //     [postId]
    // )


    return <>
        <section className="individualPost">
            <h2>{post.title}</h2>
            <Link to={`/userDetails/${post.user_id}`}><div>{post.user?.first_name} {post.user?.last_name}</div></Link>
            <div>{post.publication_date}</div>
            <div>{post.category?.label}</div>
            <p>{post.content}</p>
            {/* <div>
            {
                postTags.map((postTag) => {
                    return (
                        {postTag.tag?.label}
                    )
                })
            }
            </div>  */}
        </section>
    </>
}