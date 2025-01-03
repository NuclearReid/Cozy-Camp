export default function SearchBar() {


    return(
        <form>
            <div className="input-group has-validation">
                <span className="input-group-text">@</span>
                <div className="form-floating">
                    <input
                    type="text"
                    className="form-control"
                    id="floatingInputGroup2"
                    placeholder="Username"
                    required
                    />
                    <label htmlFor="floatingInputGroup2">Username</label>
                </div>
                <div className="invalid-feedback">
                Please choose a username.
                </div>
            </div>
            <button className='btn btn-primary'> Search </button>
        </form>
    )
}

