import { useState } from "react"
import { createComment } from "./commentManager"
import { useNavigate, useParams } from "react-router-dom";

export const CommentForm = () => {
    const localUser = localStorage.getItem("auth_token");
    const localUserObj = JSON.parse(localUser);
    const navigate = useNavigate()
    const {postId} = useParams()
    const [comment, setComment] = useState({
        author_id: localUserObj,
        post_id: postId,
        content: ""
    })
    const handleControlledInputChange = (event) => {
        const newComment = { ...comment }
        newComment[event.target.name] = event.target.value;
        setComment(newComment);
    };
    return <>
        <section>
            <fieldset>
                <div className="">
                    <label htmlFor="content">New Comment: </label>
                    <input type="text" name="content" required autoFocus className="form-control"
                        placeholder="content"
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <button
                onClick={
                    () => {
                        createComment(comment)
                        .then(() => navigate(-1))
                    }
                }>Submit</button>
            <button onClick={
                () => {
                    navigate(-1)
                }
            }>Cancel</button>
        </section>
    </>
}