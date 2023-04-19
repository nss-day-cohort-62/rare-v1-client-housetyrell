import { useEffect, useState } from "react";
import { Post } from "./post";
import { getPosts } from "./postManager";
import { getCategories } from "../categories/categoryManager";
import { GetPostsByCategory } from "./postManager";
import { getAllUsers } from "../users/UserManager";
import { GetPostsByUser } from "./postManager";

export const PostList = () => {
    const [posts, setPosts] = useState([])
    const [categories, setCategories] = useState([])
    const [users, setUsers] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(0)
    const [selectedAuthor, setSelectedAuthor] = useState(0)
    useEffect(
        () => {
            getPosts()
                .then(data => {
                    setPosts(data)
                })
            getCategories()
                .then(catdata => {
                    setCategories(catdata)
                })
            getAllUsers()
                .then(userData => {
                    setUsers(userData)
                }
            )
        },
        []
    )

    useEffect(
        () => { 
        if (parseInt(selectedCategory) !== 0) {
                GetPostsByCategory(parseInt(selectedCategory)).then((data) => {
                    setPosts(data)
                })
            }
        else if(parseInt(selectedAuthor) !==0){
                GetPostsByUser(parseInt(selectedAuthor)).then((data) => {
                    setPosts(data)
                })
           }
        else {
            getPosts()
                .then(data => {
                setPosts(data)
            })
            }
        }, [selectedCategory, selectedAuthor]
    )
    return <>
        <h2>this works</h2>
        <section>
            <select name="category_id" onChange={(evt) => setSelectedCategory(evt.target.value)}>
                <option value="0">Filter by category</option>
                {
                    categories.map(cat => {
                        return (
                            <option key={cat.id} value={parseInt(cat.id)}>
                                {cat.label}
                            </option>
                        )
                    })
                }
            </select>
        </section>
        <section>
            <select name="user_id" onChange={(evt) => setSelectedAuthor(evt.target.value)}>
                <option value="0">Filter by Author</option>
                {
                    users.map(user => {
                        return (
                            <option key={user.id} value={parseInt(user.id)}>
                                {user.first_name}
                            </option>
                        )
                    })
                }
            </select>
        </section>
        <article>
            {
                posts.map(post => {
                    return <>
                        <Post
                            key={post.id}
                            post={post}
                            myListOrMain={false}
                        />
                    </>
                })
            }
        </article>
    </>
}   