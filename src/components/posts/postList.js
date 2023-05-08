import { useEffect, useState } from "react";
import { Post } from "./post";
import { getPosts } from "./postManager";
import { getTags } from "../tags/tagManager";
import { GetPostsByTag } from "./postManager"
import { getCategories } from "../categories/categoryManager";
import { getPostsByHttpString } from "./postManager";
import { getAllUsers } from "../users/UserManager";
// import { GetPostsByUser } from "./postManager";
import { getPostsBySearch } from "./postManager";
import { PostSearch } from "./postSearch";

export const PostList = () => {
    const [posts, setPosts] = useState([])
    const [categories, setCategories] = useState([])
    const [users, setUsers] = useState([])
    const [tags, setTags] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(0)
    const [selectedAuthor, setSelectedAuthor] = useState(0)
    const [selectedTag, setSelectedTag] = useState(0)
    const [searchTerm, setSearchTerm] = useState('')
    let [filteredPosts, setFilteredPosts] = useState([])
    useEffect(
        () => {
            getPosts()
                .then(data => {
                    setPosts(data)
                    setFilteredPosts(data)
                })
            getCategories()
                .then(catdata => {
                    setCategories(catdata)
                })
            getAllUsers()
                .then(userData => {
                    setUsers(userData)
                })
            getTags()
                .then((data) => {
                    setTags(data)
                })
        },
        []
    )

    useEffect(
        () => {

            if (parseInt(selectedCategory) !== 0 || parseInt(selectedAuthor) !== 0 || parseInt(selectedTag) !== 0) {
                getPostsByHttpString(queryStrings(selectedCategory, selectedAuthor, selectedTag))
                    .then((data) => { setPosts(data) })
            }
           
            else {
                getPosts()
                    .then(data => {
                        setPosts(data)
                    })
            }

        }, [selectedCategory, selectedAuthor, selectedTag]
    )

    const queryStrings = (selectedCategory, selectedAuthor, selectedTag) => {
        let httpString = []

        if (parseInt(selectedCategory) !== 0) {
            httpString.push(`category_id=${parseInt(selectedCategory)}`)
        }
        if (parseInt(selectedAuthor) !== 0) {
            httpString.push(`user_id=${parseInt(selectedAuthor)}`)
        }
        if (parseInt(selectedTag) !== 0) {
            httpString.push(`tag_id=${parseInt(selectedTag)}`)
        }
        let newString = httpString.join("&")
        console.log(newString)
        return newString
    }




    useEffect(() => {
        if (searchTerm.length > 1) {
            getPostsBySearch(searchTerm).then((posts) => setPosts(posts))
        } else {
            getPosts().then((posts) => setPosts(posts))
        }
    }, [searchTerm])

    const onSearchTermChange = (value) => {
        setSearchTerm(value)
    }
    return <>
        <div id="getYourSearchAwayFromMyFilter">

            <PostSearch id="searchInput" onSearchTermChange={onSearchTermChange} searchTerm={searchTerm} />
            <div id="filterthings">
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
                <section>
                    <select name="tag_id" onChange={(evt) => setSelectedTag(evt.target.value)}>
                        <option value="0">Filter by Tag</option>
                        {
                            tags.map(tag => {
                                return (
                                    <option key={tag.id} value={parseInt(tag.id)}>
                                        {tag.label}
                                    </option>
                                )
                            })
                        }
                    </select>
                </section>
            </div>
        </div>
        <article>
            {
                posts?.map(post => {
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