import { useState } from "react";

const SearchBar = () => {
    const [inputState, setInputState] = useState("");
    const handleChange = (e) => {
        e.preventDefault();
        setInputState(e.target.value);
    }
    return(
        <>
            <p>Search Bar</p>
            <input value={inputState} onChange={handleChange} placeholder="Enter the city or flight number" />
        </>
    )
}

export default SearchBar;
