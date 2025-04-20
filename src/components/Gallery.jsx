import React, {use, useEffect, useState} from "react";
import TourCard from "./TourCard";

// Gallery is resposible for fetching tours and rendering tour list
const Gallery = ({ tours, setTours, onRemove }) => {
    // Local state to manage loading and errors
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Function to fetch tours from API
    const fetchTours = async () => {
        try {
            const res = await fetch('https://api.allorigins.win/raw?url=https://course-api.com/react-tours-project');
            const data = await res.json();
            setTours(data);
            setLoading(false);
        } catch (error) {
            setError(true);
            setLoading(false);
        }
    };

    // Run fetchTours once after component mounts
    useEffect(() => {
        fetchTours();
    }, []);

    // Render loading state
    if (loading) {
        return <h2>Loading...</h2>;
    };

    // Render error state
    if (error) {
        return <h2>Oh no! Error fetching tours.</h2>
    }
}

export default Gallery;