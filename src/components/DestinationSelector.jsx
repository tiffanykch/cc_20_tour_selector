import React from "react";

const DestinationSelector = ({ destinations, filter, setFilter }) => {
    return (
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            {destinations.map((destination, index) => (
                <option key={index} value={destination}>
                    {destination}
                </option>
            ))}
        </select>
    );
};

export default DestinationSelector;