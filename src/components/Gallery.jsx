import React, { useEffect, useState } from "react";
import TourCard from "./TourCard";
import DestinationSelector from "./DestinationSelector";

// Gallery is resposible for fetching tours and rendering tour list
const Gallery = ({ tours, setTours, onRemove }) => {
// Local state to manage loading and errors
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [filter, setFilter] = useState("All Destinations");

// Function to fetch tours from API
    const fetchTours = async () => {
        try {
            const res = await fetch("https://api.allorigins.win/raw?url=https://course-api.com/react-tours-project");
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
}

// Render error state
if (error) {
    return <h2>Oh no! Error fetching tours.</h2>;
}

// Render when no tours are available
if (tours.length === 0) {
    return (
        <section className="gallery">
            <h2>No tours left. Refresh to reload.</h2>
            <button onClick={fetchTours}>Refresh</button>
        </section>
    );
}

// Extract unique destinations from tours
const destinations = ["All Destinations", ...new Set(tours.map(tour => tour.destination))];

// Filter tours based on the selected filter
const filteredTours = filter === "All Destinations" 
    ? tours 
    : tours.filter(tour => tour.destination === filter);

    return (
        <div>
            {/* Use the DestinationSelector component */}
            <DestinationSelector
                destinations={destinations}
                filter={filter}
                setFilter={setFilter}
            />

            {/* Render filtered tours */}
            <div className="tour-list">
                {filteredTours.map((tour) => (
                    <TourCard key={tour.id} {...tour} onRemove={onRemove} />
                ))}
            </div>
        </div>
    );
};

export default Gallery;