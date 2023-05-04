import { useEffect, useState } from "react";
import { Post } from "./post";
import { getPosts, deletePost, updatePost } from "./postManager";


export const MyPostList = () => {
    const [posts, setPosts] = useState([])
    const [renderSwitch, setSwitch] = useState(false)
    const localUser = localStorage.getItem('userId')
    // const localUserObj = JSON.parse(localUser)
    useEffect(
        () => {
            getPosts()
                .then(data => {
                    const currentUserPosts = data.filter(post => post.user_id === localUser)
                    setPosts(currentUserPosts)
                })
        },
        [renderSwitch]
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
    


    return <>
        <h2>this works for my posts</h2>
        <article>
            {
                posts.map(post => {
                    return <>
                        <Post
                            key={post.id}
                            post={post}
                            myListOrMain={true}
                            renderSwitch = {renderSwitch}
                            setRenderSwitch = {setSwitch}
                        />
                    </>
                })
            }
        </article>
    </>
}   