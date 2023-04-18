import { useEffect, useState } from "react";
import { Post } from "./post";
import { getPosts } from "./postManager";


export const PostList = () => {
    const [posts, setPosts] = useState([])

    useEffect(
        () => {
            getPosts()
                .then(data => {
                    setPosts(data)
                })
        },
        []
    )
    return <>
        <h2>this works</h2>
        <article>
            {
                posts.map(post => {
                    return <>
                        <Post
                            key={post.id}
                            post={post}
                        />
                    </>
                })
            }
        </article>
    </>
}   