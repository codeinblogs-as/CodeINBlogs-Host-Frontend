import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeleteEvent = () => {
    const [events, setevents] = useState([]);

    useEffect(() => {
        // Fetch events from the server when the component mounts
        const fetchevents = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/displayEvent`);
                setevents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchevents();
    }, []);

    const deleteEvent = async (eventId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/deleteEvent/${eventId}`);
            // Assuming you want to update the event list after deletion
            const updatedEvents = events.filter(event => event._id !== eventId);
            setevents(updatedEvents);
            // You can show a success message or perform other actions upon successful deletion
        } catch (error) {
            console.error('Error deleting event:', error);
            // Handle error scenario as needed
        }
    };

    return (
        <div className="container mx-auto p-4 text-white">
            <h2 className="text-3xl font-semibold mb-4">Event List</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {events.map((event) => (
                    <div key={event._id} className="bg-white p-4 rounded shadow">
                        <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                        <p className="text-gray-700 mb-2">{event.description}</p>
                        <p className="text-gray-600 mb-2">Author: {event.speakerName}</p>
                        <p className="text-gray-600 mb-2">Topic: {event.topic}</p>
                        <p className="text-gray-600 mb-2">Social Media Handle: {event.eventLink}</p>
                        <img
                            src={`data:image/jpeg;base64,${event.eventImage}`} // Adjust the MIME type as needed
                            alt={event.title}
                            className="w-full h-auto"
                        />
                        <button
                            onClick={() => deleteEvent(event._id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                            Delete Event
                        </button>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default DeleteEvent;