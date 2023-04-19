import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addPost } from "./postManager";
import { getCategories } from "../categories/categoryManager";
import { getAllUsers } from "../users/UserManager";
import { getPosts, getPostById, updatePost } from "./postManager";

export const PostForm = () => {
  const { postId } = useParams()
  const [post, setPost] = useState({});
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const localUser = localStorage.getItem("auth_token");
  const localUserObj = JSON.parse(localUser);

  useEffect(() => {
    getAllUsers().then((data) => {
      setUsers(data);
    });

    getCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  useEffect(() => {
    getPosts().then((data) => { setPosts(data) })



  }, [])

  useEffect(
    () => {
      if (postId) {
        getPostById(postId)
          .then(
            (data) => {
              setPost(data)
            }
          )
      }
    }, [postId]
  )

  const handleControlledInputChange = (event) => {
    const newPost = { ...post };
    newPost[event.target.name] = event.target.value;
    setPost(newPost);
  };
  const CreateNewPost = () => {
    if (postId) {
      // PUT
      updatePost({
        id: post.id,
        user_id: localUserObj,
        category_id: post.category_id,
        title: post.title,
        publication_date: post.publication_date,
        image_url: post.image_url,
        content: post.content
      })
       .then(() => navigate(`/postDetails/${postId}`))
    }
    else {
      addPost({
        user_id: localUserObj,
        category_id: parseInt(post.category_id),
        title: post.title,
        publication_date: new Date().toLocaleDateString(),
        image_url: post.image_url,
        content: post.content,
        approved: 1
      })
        .then(res => res.json()).then((data) => navigate(`/postDetails/${data.id}`))
    };
  };

  return (
    <>
      <form>
        <h2>{postId ? "Update Post" : "Create New Post"}</h2>
        <fieldset>
          <div className="">
            <label htmlFor="">Category</label>
            <select name="category_id" value={post.category_id} onChange={handleControlledInputChange}>
              <option value="0"> Choose a category</option>
              {categories.map((category) => {
                return (
                  <option key={category.id} value={parseInt(category.id)}>
                    {category.label}
                  </option>
                );
              })}
            </select>
          </div>
        </fieldset>

        <fieldset>
          <div className="">
            <label htmlFor="post_title">Post Title</label>
            <input
              type="text"
              name="title"
              required
              autoFocus
              className="form-control"
              placeholder="Post Title "
              defaultValue={post.title}
              onChange={handleControlledInputChange}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="">
            <label htmlFor="image_url">Image URL</label>
            <input
              type="text"
              name="image_url"
              required
              autoFocus
              defaultValue={post.image_url}
              className="form-control"
              placeholder="Image URL"
              onChange={handleControlledInputChange}
            />
          </div>
        </fieldset>

        <fieldset>
          <div className="">
            <label htmlFor="content">Your Post Here</label>
            <input
              type="text"
              name="content"
              required
              autoFocus
              defaultValue={post.content}
              className="form-control"
              placeholder="Content"
              onChange={handleControlledInputChange}
            />
          </div>
        </fieldset>

        <button
          type="submit"
          onClick={(evt) => {
            evt.preventDefault();
            setIsLoading(false)
            CreateNewPost();
          }}
          className="btn btn-primary"
        >
          {postId ? "Save Updates" : "Make A New Post"}
        </button>
      </form>
    </>
  );
};
