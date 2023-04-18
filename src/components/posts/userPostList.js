import { useEffect, useState } from "react";
import { Post } from "./post";
import { getPosts, deletePost, updatePost } from "./postManager";


export const MyPostList = () => {
    const [posts, setPosts] = useState([])
    const [updatePost, setUpdatePost] = useState(false)
    const localUser = localStorage.getItem('auth_token')
    const localUserObj = JSON.parse(localUser)
    useEffect(
        () => {
            getPosts()
                .then(data => {
                    const currentUserPosts = data.filter(post => post.user_id === localUserObj.id)
                    setPosts(currentUserPosts)
                })
        },
        []
    )
    // const newPostObjForAPI = {
    //         user_id: localUserObj,
    //         category_id: post.category_id, 
    //         title: post.title,
    //         publication_date: new Date().toLocaleDateString,
    //         image_url: post.image_url, 
    //         content: post.content,
    //         approved: true
    // }
    const updatePostFunction = () => {
        return <>
        <section>
        </section>
        </>
    }
    return <>
        <h2>this works for my posts</h2>
        <article>
            {
                posts.map(post => {
                    return <>
                        <Post
                            key={post.id}
                            post={post}
                        />
                        <button onClick={
                            () => {
                                setUpdatePost(true)
                            }
                        }>Edit</button>
                        <button onClick={
                            ()=> {
                                if (window.confirm("are you sure?")) {
                                    deletePost(post.id)
                                }
                            }
                        }>Delete</button>
                    </>
                })
            }
        </article>
    </>
}   