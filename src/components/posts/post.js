import { Link } from "react-router-dom"
import "./posts.css"
export const Post = ({ post }) => {
    return <>
        <section className="individualPost">
            <Link to={`/postDetails/${post.id}`}><h2>{post.title}</h2></Link>
            <div>{post.user?.first_name} {post.user?.last_name}</div>
            <div>{post.publication_date}</div>
            <div>{post.category?.label}</div>
        </section>
    </>
}