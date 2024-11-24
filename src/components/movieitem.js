// Imports
import axios from "axios";
import { useState } from "react";

// Define the Create component
const Create = () => {

    // State hooks to manage form inputs for the movie title, year, and poster URL
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [poster, setPoster] = useState('');

    // Function to handle the form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents the default form submission behavior (e.g., page refresh)
        
        // Create a movie object from the state values
        const movie = { title, year, poster };
        console.log(movie); // Log the movie object to the console for debugging
        
        // Send a POST request to the API to save the movie data
        axios.post('http://localhost:4000/api/movies', movie)
            .then((res) => {
                console.log(res.data); // Log the response data for debugging
            })
            .catch((error) => {
                console.error(error); // Log any errors if the request fails
            });
    };

    // Render the form and handle user input
    return (
        <div>
            <h3>Hello from create component!</h3>
            {/* Form to collect movie details */}
            <form onSubmit={handleSubmit}>
                {/* Input field for the movie title */}
                <div className="form-group">
                    <label>Add Movie Title: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={title} // Binds the input value to the state
                        onChange={(e) => { setTitle(e.target.value); }} // Updates the state when the input changes
                    />
                </div>
                {/* Input field for the movie year */}
                <div className="form-group">
                    <label>Add Movie Year: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={year} // Binds the input value to the state
                        onChange={(e) => { setYear(e.target.value); }} // Updates the state when the input changes
                    />
                </div>
                {/* Input field for the movie poster URL */}
                <div className="form-group">
                    <label>Add Movie Poster: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={poster} // Binds the input value to the state
                        onChange={(e) => { setPoster(e.target.value); }} // Updates the state when the input changes
                    />
                </div>
                {/* Submit button to add the movie */}
                <div>
                    <input type="submit" value="Add Movie" />
                </div>
            </form>
        </div>
    );
};

// Export the Create component so it can be used in other parts of the application
export default Create;
