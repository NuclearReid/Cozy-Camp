import { Card, Container, Row, Col, Button } from 'react-bootstrap'
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
        if(data?.user) {
            setSearchedUser(data.user)
        }
    })

    return(
        <a 
            href="/searchedScene"
            className="btn btn-primary" 
            onClick={handleSearchButtonClick}
        >
            Look at: {data.user.username}'s Camp
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
                <button type="submit" className="btn btn-primary">Search</button>
            </form>

            {loading && <p>Loading...</p>}
            {data?.user?._id == null && <p>Unable to find that username</p>}
            {data?.user?._id && (
                <Container>
                    <Row>
                        <Col md={6}>
                            <Card >
                                <Card.Body>
                                    <Card.Title>User Details</Card.Title>
                                    <Card.Text>
                                        <strong>Username:</strong> {data.user.username} <br />
                                        <strong>Shelter:</strong> {data.user.options.shelter} <br />
                                        <strong>Shelter Description:</strong> {data.user.options.shelterDescription}
                                    </Card.Text>
                                    {/* This is sending the retrieved data to the global state */}
                                    <SearchButton data={data} />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            )}
        </>
  );
}
