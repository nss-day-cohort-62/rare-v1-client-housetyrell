
export const PostSearch = ({ searchTerms, onSearchTermChange }) => {
    return (
      <>
        <div>Search by post title</div>
        <input type="text" className=""
          value={searchTerms}
          onChange={
            (changeEvent) => {
              onSearchTermChange(changeEvent.target.value)
            }
          }
          placeholder="Enter title of post here..." />
      </>
    )
  }
  