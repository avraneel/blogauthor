export default function Comment({
  id,
  authorName,
  date,
  content,
  showDelete,
  setUpdateFlag,
}) {
  const localeDate = date.toLocaleString();

  async function handleSubmit(formData) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", localStorage.getItem("token"));
    const request = {
      method: "DELETE",
      headers: myHeaders,
    };

    const commentIdToDelete = formData.get("delete");

    const response = await fetch(
      `http://localhost:3000/comments/${commentIdToDelete}`,
      request,
    );
    if (response.ok) {
      setUpdateFlag((updateFlag) => !updateFlag);
    }
  }

  return (
    <div className="comment">
      <p>{`${authorName}, ${localeDate}`}</p>
      <p>{content}</p>
      {showDelete === true && (
        <form action={handleSubmit}>
          <input type="hidden" name="delete" value={id} />
          <button>Delete</button>
        </form>
      )}
    </div>
  );
}
