import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addPost } from "./postManager";
import { getCategories } from "../categories/categoryManager";
import { getAllUsers } from "../users/UserManager";
import { getPosts, getPostById, updatePost } from "./postManager";
import { getTags, getPostTags, createPostTags } from "../tags/tagManager";

export const PostForm = () => {
  const { postId } = useParams();
  const [post, setPost] = useState({
    id: 0,
    user_id: 0,
    category: 0,
    title: "",
    publication_date: "",
    image_url: "",
    content: "",
    approved: 1,
    tags: []
  });
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [postTags, setPostTags] = useState([])
  const navigate = useNavigate();
  const localUser = localStorage.getItem("userId");
 
  // const localUserObj = JSON.parse(localUser);

  //need state variable to fill in checked value on checkboxes
  //need to have state based array that watches for incoming posttags on post and populating with values
  //need a function to set checkbox to true if evt.target.value is in state based post tag array
  //need function to watch whether checked is true and add evt.target.value to state based array
  //need to have state based array added to updated object upon submission

  useEffect(() => {
    getAllUsers().then((data) => {
      setUsers(data);
    });

    getCategories().then((data) => {
      setCategories(data);
    });

    getTags().then((data) => {
      setTags(data);
    })
  }, []);


  useEffect(() => {
    if (postId) {
      getPostById(parseInt(postId)).then((data) => {
        data.tags = data.tags.map((tag) => tag.id)
        data.category = data.category.id
        setPost(data);
      });
    }
  }, [postId]);


  const CheckIfChecked = (tag) => {
    const copy = { ...post }
    let checked = copy?.tags?.find((postTag) => tag.id === postTag)
    if (checked) {
      return true
    }
    else {
      return false
    }


  }

  const handleControlledInputChange = (event) => {
    const newPost = { ...post };
    if (event.target.name === "tags") {
      if (newPost.tags.includes(parseInt(event.target.value))) {
        const index = newPost.tags.indexOf(parseInt(event.target.value));
        console.log(index)
        newPost.tags.splice(index, 1);
      } else {
        newPost[event.target.name].push(parseInt(event.target.value))
      }

    }
    else {
      newPost[event.target.name] = event.target.value;
    }
    setPost(newPost);
  };
  // const tagPushOrPull = (event) => {
  //   const newPost = {...post}
  //   if (event.target.name === "post_tags") {
  //     // console.log(postTags)
  //     // const selectedTag = postTags.find((tag) => tag === event.target.value)
  //     // console.log(selectedTag)
  //     console.log(postTags)
  //     if (postTags.includes(event.target.value)) {
  //       const index = post.post_tags.indexOf(event.target.value);
  //       newPost.post_tags.splice(index, 1);
  //     } else {
  //       newPost[event.target.name].push(parseInt(event.target.value))
  //     }
  //      }    
  //      setPost(newPost)
  //     }


  const CreateNewPost = () => {
    if (postId) {
      // PUT
      updatePost({
        id: post.id,
        user: parseInt(localUser),
        category: parseInt(post.category),
        title: post.title,
        publication_date: post.publication_date,
        image_url: post.image_url,
        content: post.content,
        approved: true,
        tags: post.tags
      }).then(() => navigate(`/postDetails/${postId}`));
    } else {
      addPost({
        user: parseInt(localUser),
        category: parseInt(post.category),
        title: post.title,
        publication_date: new Date().toISOString().split('T')[0],
        image_url: post.image_url,
        content: post.content,
        approved: true,
        tags: post.tags
      })
        .then((res) => res.json())
        .then((data) => navigate(`/postDetails/${data.id}`));
    }
  };

  return (
    <>
      <form>
        <h2>{postId ? "Update Post" : "Create New Post"}</h2>
        <fieldset>
          <div className="">
            <label htmlFor="">Category</label>
            <select
              name="category"
              value={post.category}
              onChange={handleControlledInputChange}
            >
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
        <fieldset>
          <div>
            {tags.map((tag) => {
              return (
                <>
                  <label>{tag.label}</label>
                  <input
                    name="tags"
                    type="checkbox"
                    key={tag.id}
                    checked={CheckIfChecked(tag)}//checked based on boolean state variable
                    value={tag.id}
                    onChange={handleControlledInputChange}
                  />
                  {/* {CheckIfChecked(tag)} */}
                </>
              );
            })}
          </div>
        </fieldset>

        <button
          type="submit"
          onClick={(evt) => {
            evt.preventDefault();
            setIsLoading(false);
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




  // useEffect(
  //     () => {
  //         if (posts) {

    //         let newPosts = posts
    //         if (parseInt(selectedCategory) !== 0) {
    //             newPosts = posts.filter(post => post.category_id === parseInt(selectedCategory))
    //         }
    //         if (parseInt(selectedAuthor) !== 0) {
    //             newPosts = posts.filter(post => post.author_id === parseInt(selectedAuthor))
    //         }
    //         if (parseInt(selectedTag) !== 0) {
    //             newPosts = posts.filter(post => post.tag_id === parseInt(selectedTag))
    //         }
    //
    //    }
    //         setFilteredPosts(newPosts)
    //
  //     }, [selectedCategory, selectedAuthor, selectedTag, posts]
  // )
