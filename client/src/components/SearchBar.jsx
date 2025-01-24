import { FIND_USER } from "../utils/queries";
import { useLazyQuery } from "@apollo/client";
import { useState } from "react";
import useStore from "../stores/useStore";


// the Search Button is it's own component to make Zustand's global state work
// Basically, the useStore hook wasn't working in the main body of SearchBar so I had to move it 
const SearchButton = ({ data }) => {
    // Puts the searched user into the global State
    const setSearchedUser = useStore((state) => state.setSearchedUser)
    const handleSearchButtonClick = (event => {
        console.log('clicked the search button')
        if(data?.user) {
            setSearchedUser(data.user)
        }
        console.log(useStore.getState().searchedUser)
    })

    return(
        <a 
            href="/searchedScene"
            className="btn btn-primary" 
            onClick={handleSearchButtonClick}
        >
            <p>Look at: {data.user.username}'s Camp</p>
        </a>
    )
}

export default function SearchBar() {
  // useLazyQuery is to make it so the query runs when i click the search button instead of when the page loads
  const [findUser, { loading, data, error }] = useLazyQuery(FIND_USER);
  const [formState, setFormState] = useState({
    usernameSearch: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    })
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const searchUser = await findUser({
        variables: {
          username: formState.usernameSearch,
        },
      })
    } catch (error) {
      console.error(error)
    }
    
    // setFormState({
    //   usernameSearch: ''
    // })
  }


  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className="input-group has-validation">
          <span className="input-group-text">@</span>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInputGroup2"
              placeholder="Username"
              name="usernameSearch"
              onChange={handleChange}
              required
            />
            <label htmlFor="floatingInputGroup2">Username</label>
          </div>
          <div className="invalid-feedback">Please choose a username.</div>
        </div>
        <button type="submit" className="btn btn-primary">
          {" "}
          Search{" "}
        </button>
      </form>
      {/* This is just where I can make sure the user info is showing up! */}
      {/* This data is being saved in the global State with Zustand */}


      {loading && <p>Loading...</p>}
      {/* Lets the user know a username was not found */}
      {data?.user?._id == null && <p>Unable to find that username</p>}
      {/* If a user is found with that username, their info is displayed || also creates the <a> to see their scene */}
      {data?.user?._id && (
        <>
          <div>
            <h1>User Details</h1>
            <p>Username: {data.user.username}</p>
            <p>Shelter: {data.user.options.shelter}</p>
            <p>Shelter Description: {data.user.options.shelterDescription}</p>
          </div>
          {/* Sends the searched user's data as a prop to SearchButton where it'll be put into the Zustand Global State */}
          <SearchButton data={data}/>
        </>
      )}
    </>
  );
}
