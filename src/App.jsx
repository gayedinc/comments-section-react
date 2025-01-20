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
        <h2>{data.name}</h2>
      </div>
    </>
  )
}