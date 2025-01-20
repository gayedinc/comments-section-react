import { useEffect, useState } from "react";

export default function App() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function getComments() {
      const data = await fetch('/data/data.json').then(res => res.json());
      setComments(data);
    }

    getComments();
  }, []);

  function appendWork(comment) {
    setComments([...comments, comment]);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);
    formObj.id = crypto.randomUUID();

    appendWork(formObj);
    e.target.reset();
  }

  return (
    <>
      <form onSubmit={handleSubmit} autoComplete="off">
        <input type="text" name="comment" placeholder="Add comment..." />
        <button type="submit">Submit</button>
      </form>
      <div className="comment-section">
        {comments.length === 0 ?
          <p>No comments found.</p> :
          <ul>
            {comments.map((x, i) => <li key={i}>
              <h2>{x.name}</h2>
              <span>{x.time}</span>
              <p>{x.comment}</p>
              <span>Likes: {x.likes}</span>
              <span>Dislikes: {x.dislikes}</span>
              {x.replies && x.replies.length > 0 && (
                <ul>
                  {x.replies.map((reply, i) => (
                    <li key={i}>
                      <h3>{reply.name}</h3>
                      <span>{reply.time}</span>
                      <p>{reply.comment}</p>
                      <span>Likes: {reply.likes}</span>
                      <span>Dislikes: {reply.dislikes}</span>
                    </li>
                  ))}
                </ul>
              )}
            </li>)}
          </ul>}
      </div>
    </>
  )
}