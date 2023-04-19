import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getPostById } from "./postManager"

export const PostComments = () => {
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
        {
            post?.comments?.map(comment => {
                return <>
                <div>{comment}</div>
                </>
            })
        }
    </>
}