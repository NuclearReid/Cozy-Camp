import useStore from "../../stores/useStore";

export default function SearchedScene() {
  const searchedUser = useStore((state) => state.searchedUser);

  console.log(useStore.getState().searchedUser)
  
  return (
    <>
      <h1>Searched Scene is here!</h1>
      {searchedUser ? (
        <>
          <h2>{searchedUser.username}'s Scene</h2>
          <p>ID: {searchedUser._id}</p>
          <p>Email: {searchedUser.email}</p>
          <p>Shelter: {searchedUser.shelter}</p>
        </>
      ) : (
        <p>No user data available</p>
      )}
    </>
  );
}
