// Importing required dependencies
import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios'; 
import { useNavigate } from "react-router-dom";

// Define the Edit component
export default function Edit(props) {
    // Extract the `id` parameter from the URL using useParams
    let { id } = useParams();

    const [title, setTitle] = useState(""); // State for movie title
    const [year, setYear] = useState(""); // State for movie release year
    const [poster, setPoster] = useState(""); // State for movie poster URL

    // Hook to programmatically navigate to other routes
    const navigate = useNavigate();

    // useEffect to fetch movie data when the component loads or the `id` changes
    useEffect(() => {

        axios.get('http://localhost:4000/api/movie/' + id)
            .then((response) => {
                // Update state with the fetched movie details
                setTitle(response.data.title);
                setYear(response.data.year);
                setPoster(response.data.poster);
            })
            .catch((error) => {
                console.log(error); // Debugging
            });
    }, [id]);

    // Function to handle the form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // Create an updated movie object
        const newMovie = { id, title, year, poster };

        // Send a PUT request to update the movie details on the server
        axios.put('http://localhost:4000/api/movie/' + id, newMovie)
            .then((res) => {
                console.log(res.data); // Debugging
                navigate('/read'); // Navigate to the "read" page after successful update
            });
    };

    // JSX to render the form for editing movie details
    return (
        <div>
            {/* Form to edit movie details */}
            <form onSubmit={handleSubmit}>
                {/* Input field for the movie title */}
                <div className="form-group">
                    <label>Movie Title: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}   // Binds the input value to the state
                        onChange={(e) => setTitle(e.target.value)} // Updates state on input change
                    />
                </div>
                {/* Input field for the release year */}
                <div className="form-group">
                    <label>Release Year: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    />
                </div>
                {/* Input field for the poster URL */}
                <div className="form-group">
                    <label>Poster URL: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={poster}
                        onChange={(e) => setPoster(e.target.value)}
                    />
                </div>
                {/* Submit button to save changes */}
                <div className="form-group">
                    <input type="submit" value="Edit Movie" className="btn btn-primary" />
                </div>
            </form>
        </div>
    );
}
