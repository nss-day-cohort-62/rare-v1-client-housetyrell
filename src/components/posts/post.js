import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { deletePost } from "./postManager"
import "./posts.css"
export const Post = ({ post, myListOrMain }) => {
    const [updatePost, setUpdatePost] = useState(false)
    const [renderSwitch, setSwitch] = useState(false)
    const navigate = useNavigate()
    const localUser = localStorage.getItem('auth_token')
    const localUserObj = JSON.parse(localUser)
    // console.log(parseInt(localUserObj))
    // console.log(parseInt(post.user_id))
    // const updatePostFunction = () => {
    //     if (updatePost) {
    //         return <>
    //             <section>
    //                 This is where we will have update forms
    //                 <button>Submit</button>
    //                 <button onClick={
    //                     () => {
    //                         setUpdatePost(false)
    //                     }
    //                 }>Cancel</button>
    //             </section>
    //         </>
    //     }
    //     else {
    //         return <></>
    //     }
    // }

    return <>
        <section className="individualPost">
            <Link to={`/postDetails/${post.id}`}><h2>{post.title}</h2></Link>
            <div>{post.user?.first_name} {post.user?.last_name}</div>
            <div>{post.publication_date}</div>
            <div>{post.category?.label}</div>
            <div>{post?.post_tags?.map((postTag) => {

                return <>
                        {postTag.label}
                    </>
            })}</div>
            {parseInt(localUserObj) === post.user_id && myListOrMain === true ?
                <>
                    <button onClick={
                        () => {
                            navigate(`/edit/${post.id}`)
                            setUpdatePost(true)

                        }
                    }>Edit</button>
                    <button onClick={
                        () => {
                            if (window.confirm("are you sure?")) {
                                deletePost(post.id).then(() => setSwitch(!renderSwitch))
                            }
                        }
                    }>Delete</button>
                </>
                :
                <></>

            }
        </section>
    </>
}