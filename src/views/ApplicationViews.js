import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { PostDetails } from "../components/posts/postDetails"
import { PostList } from "../components/posts/postList"
import { Authorized } from "./Authorized"
import { CategoryList } from "../components/categories/categoryList"
import { TagList } from "../components/tags/tagList"
import { CategoryForm } from "../components/categories/categoryForm"
import { MyPostList } from "../components/posts/userPostList"
import { TagForm } from "../components/tags/tagForm"
import { UserList } from "../components/users/userList"
import { PostForm } from "../components/posts/postForm"
import { UserDetails } from "../components/users/userDetails"
import { PostSubscriptions } from "../components/posts/subscribedPosts"
import { PostComments } from "../components/posts/PostComments"
import {CommentForm} from "../components/posts/CommentForm"

export const ApplicationViews = ({ token, setToken }) => {
  return <>
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/register" element={<Register setToken={setToken} />} />
      <Route element={<Authorized token={token} />}>
      <Route path="/posts" element={<PostList />} />
      <Route path="/" element={<PostList />} />
      <Route path="/my-posts" element={<MyPostList/>} />
      <Route path="/postForm" element ={<PostForm />} />
      <Route path="postDetails/:postId" element={<PostDetails/>} />
      <Route path="/categories" element={<CategoryList />} />
      <Route path="/tags" element={<TagList />} />
      <Route path="/tagForm" element={<TagForm />} />
      <Route path="/users" element={<UserList />} />
      <Route path="/edit/:postId" element={<PostForm />} />
      <Route path="/userDetails/:userId" element={<UserDetails />} />
      <Route path="/comments/:postId" element={<PostComments />} />
      <Route path ="/commentForm/:postId" element={<CommentForm />} />
      </Route>
    </Routes>
  </>
}
